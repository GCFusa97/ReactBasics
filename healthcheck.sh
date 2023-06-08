#!/bin/bash


# The first section of the script initializez variables, like namespace,label for pods, log_file, extracts PODS, echoes useful information
#**************************************************************************************************

# Metrics server addon is not enabled by default in Minikube
minikube addons enable metrics-server >/dev/null 2>&1

# Define the namespace and pod labels to monitor
NAMESPACE=$1
LABELS=$2
LOG_FILE=$3

# Get all pods matching specific labels from current namespace
PODS=$(kubectl get pods -l app="$LABELS" --namespace "$NAMESPACE" -o name | sed 's/pod\///g')

#***************************************************************************************************



# The second part defines some utility functions that check for resource utilisation, display pod info,search for errors in logs.. etc
#**************************************************************************************************

display_pod_info() {

  echo -e "\nCluster ip address: $(minikube ip)\n"
  echo -e "Current active services for namespace: "$NAMESPACE"\n"
  echo "$(kubectl get services -n "$NAMESPACE")"
  # Print the number of online pods and specify logging start time
  echo -e "\nLog performed at current time: $(date +"%Y-%m-%d,%H:%M:%S") \n" | tee -a "$LOG_FILE"
  echo "Total number of pods from current namespace: $(echo "$PODS" | wc -l)" | tee -a "$LOG_FILE"
  echo "---------------------------------------------------------------------" | tee -a "$LOG_FILE"

  for pod in $PODS; do
  echo -e "Pod: $pod\n" | tee -a "$LOG_FILE"
  show_pod_requests "$pod" | tee -a "$LOG_FILE"
  done
  echo "---------------------------------------------------------------------" | tee -a "$LOG_FILE"
  echo -e "Entering monitoring loop...\n" | tee -a "$LOG_FILE"
}



check_resources() {

    # Get CPU and Memory usage metrics for the pod
    cpu_usage=$(kubectl top pod $pod -n $NAMESPACE | awk '{print $2}')
    memory_usage=$(kubectl top pod $pod -n $NAMESPACE | awk '{print $3}')

    # Convert them to numeric values in order to compare them
    cpu_usage_numeric=$(echo "$cpu_usage" | tr -dc '0-9')
    memory_usage_numeric=$(echo "$memory_usage" | tr -dc '0-9')

    # Check if CPU and memory usage exceed a certain threshold
    if [[ "$cpu_usage_numeric" -gt 1 ]] || [[ "$memory_usage_numeric" -gt 50 ]]; then
      echo "Warning: High resource usage detected for pod: "$pod"" | tee -a "$LOG_FILE"
    fi


    # Print resource utilisation
    echo "Pod: $pod" | tee -a "$LOG_FILE"
    echo "CPU Usage: $cpu_usage" | tee -a "$LOG_FILE"
    echo "Memory Usage: $memory_usage" | tee -a "$LOG_FILE"
    echo  "---------------------------------------------------------------------"
}



analyze_logs() {

    pod=$1

    # Get the logs for a specific pod
    logs=$(kubectl logs $pod -n $NAMESPACE)

    # Count errors from the log
    error_count=$(echo "$logs" | grep -ico "error")

    # Verify if there are any errors, if yes, report number of errors to log file
    if [[ "$error_count" -gt 0 ]]; then
      echo "Error count in logs for pod "$pod": "$error_count"" | tee -a "$LOG_FILE"
    fi
}



# This function check how many users hit port 3000 from a specific pod
show_pod_requests() {

    pod=$1

    echo -e "$(kubectl exec -n react-application "$pod" -- netstat -ant)\n"
}

#show_network_info() {

#}



# First i want to display some information related to pods
display_pod_info



# The third part of the script enters the monitoring loop, as long as the script runs, we monitor the functionality of each pod
#**********************************************************************************************************************************

while true; do

  # Iterate over each pod
  for pod in $PODS; do

    # This function checks resource utilisation
    check_resources "$pod"

    # This function analyzez the logs from each pod and reports the number of errors encountered
    analyze_logs "$pod"

#    show_pod_requests "$pod"
  done

  # Wait for some time before checking the pods again
  sleep 10
done
#**********************************************************************************************************************************
