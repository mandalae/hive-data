#!/bin/bash

TODAY=$(date +'%d-%m-%Y')

sudo rm -rf /home/ec2-user/work/dbbackup/*

sudo mkdir -p /home/ec2-user/work/dbbackup/$TODAY

sudo docker exec -it influxdb sh -c 'rm -rf /tmp/dbbackup && influxd backup -portable -database hiveData /tmp/dbbackup/'

sudo docker cp influxdb:/tmp/dbbackup/* /home/ec2-user/work/dbbackup/$TODAY && sudo chown -R ec2-user:ec2-user /home/ec2-user/work/dbbackup

# aws s3 rm s3://hive-monitoring-backup --recursive

aws s3 sync /home/ec2-user/work/dbbackup s3://hive-monitoring-backup --delete
