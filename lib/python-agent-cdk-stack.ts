import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';

export class PythonAgentCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'PythonAgentVpc', {
      maxAzs: 2
    });

    const cluster = new ecs.Cluster(this, 'PythonAgentCluster', {
      vpc: vpc
    });

    new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'PythonAgentService', {
      cluster: cluster,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset('../python-agent'),
      },
      publicLoadBalancer: true,
    });
  }
}
