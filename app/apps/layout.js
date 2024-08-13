"use client";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu, theme } from "antd";

const { Sider, Content } = Layout;

export default function AppsLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className=" min-h-screen">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: "white",
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Home",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Navigation",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "Others",
              },
            ]}
          />
        </Sider>
        <Content
          style={{
            margin: "24px 16px",
            // padding: ,
            minHeight: "100%",
            width: "100%",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
