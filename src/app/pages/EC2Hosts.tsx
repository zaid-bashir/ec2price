import React, { ReactNode, useEffect, useMemo } from "react";
import { useCurrentTheme } from "@dynatrace/strato-components/core";
import { Flex } from "@dynatrace/strato-components/layouts";
import { TitleBar } from "@dynatrace/strato-components-preview/layouts";
import { useAppFunction, useDqlQuery } from "@dynatrace-sdk/react-hooks";
import { Button, Heading, Paragraph, ProgressCircle, Skeleton, Strong } from "@dynatrace/strato-components";
import { CPU_USAGE, EC2_INSTANCES } from "../queries";
import { DataTableV2 } from '@dynatrace/strato-components-preview/tables';
import { DataTableV2ColumnDef } from "@dynatrace/strato-components-preview";
export const EC2Hosts = () => {
  const ec2InstancesData = useDqlQuery({ body: { query: `${EC2_INSTANCES}` } })
  const ec2PricesData = useAppFunction(
    {
      name: "ec-2-prices-api",
      data: {
        appUser: "Zaid Bashir",
        latlong: "37.895744,89.854547",
        lastLogins: [
          "India",
          "Pakistan",
          "China",
          "UAE",
          "Saudi Arabia",
          "USA"
        ],
        metadata: {
          metadataone: [
            "Hello"
          ]
        }
      }
    }
  );


  let total = 0;

  if (ec2InstancesData.data?.records && ec2PricesData.data) {
    try {
      ec2InstancesData.data?.records.forEach((record) => {
        const awsInstanceType = record?.awsInstanceType as string;
        if (awsInstanceType && ec2PricesData.data) {
          const price = ec2PricesData.data[awsInstanceType as string];
          if (price !== undefined) {
            total += price;
          }
        }
      });
    } catch (error) {
      console.error('Error Calculating Total: ', error);
    }
  }

  const columns = useMemo<DataTableV2ColumnDef<typeof ec2InstancesData.data[]>[]>(() => [
    {
      header: 'Id',
      accessor: 'id',
      id: 'id',
    },
    {
      header: 'Entity Name',
      accessor: 'entityName',
      id: 'entityName',
    },
    {
      header: 'Aws Instance Type',
      accessor: 'awsInstanceType',
      columnType: 'text',
      id: 'awsInstanceType',
    },
    {
      header: 'Price($/hr)',
      columnType: 'text',
      accessor: (value) => ec2PricesData.data ? JSON.stringify(ec2PricesData.data[value['awsInstanceType']]) : '0.0',
      id: 'price',
    }
  ], []);

  return (
    <Flex flexDirection="column" alignItems="center" padding={12}>
      <TitleBar>
        <TitleBar.Title>{"EC2 Instance sCost"}</TitleBar.Title>
      </TitleBar>

      <Flex flexDirection="column" alignItems="start" padding={12} >
        {ec2PricesData.isLoading ? <span></span> : <Strong style={{ textAlign: "left" }} >{`EC2 Instance Cost : ${total}`}</Strong>}
      </Flex>

      <div style={{ width: '100%' }} >
        {(ec2PricesData.isLoading) ? <ProgressCircle /> : <DataTableV2 columns={columns} data={ec2InstancesData?.data?.records as []} fullWidth variant={{ verticalDividers: true }}  >
          {/* <DataTableV2.ExpandableRow
          >
            {(row) => (
              <div>
                <Heading level={4} >CPU Usage</Heading>
                {componentCus(row as {})}
              </div>
            )}
          </DataTableV2.ExpandableRow> */}
        </DataTableV2>}
      </div>
    </Flex>
  );
};

// function componentCus(rowData:Record<string,string>) : React.ReactNode {

//   const cpuUsageData = useDqlQuery(
//     {
//       body:{
//         query:{CPU_USAGE(rowData['row']['id'])}
//       }
//     }
//   )

//   if(!rowData['row']['id']){
//     return <div>Id Is Missing</div>
//   }
//   return <div>
//     <Heading level={4} >{rowData['row']['id']}</Heading>

//   </div>
// }

