#!/bin/bash

# logs the device ip with which the app is reachable from mobile (unix/mac)
ifconfig | grep "inet 192" | grep -v 127.0.0.1