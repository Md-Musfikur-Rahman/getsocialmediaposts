"use client";
import React, { useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Button } from "antd";

const ResultCard = ({
  social_media,
  loading,
  post_title,
  post_des,
  post_url,
  key,
}) => {
  const [isLoading, setisLoading] = useState(false);

  const actions = [
    <Button key={post_url} type="link" href={post_url} target="_blank">
      <EditOutlined key="edit" />
    </Button>,

    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
  ];
  return (
    <>
      <Card
        loading={isLoading}
        actions={actions}
        style={{
          minWidth: 300,
        }}
      >
        <Card.Meta
          avatar={<Avatar src={`${social_media}.webp`} />}
          title={post_title}
          description={
            <>
              <p>{post_des}</p>
            </>
          }
        />
      </Card>
    </>
  );
};
export default ResultCard;
