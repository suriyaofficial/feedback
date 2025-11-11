import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBusiness } from "../services/api";
import { Card, Checkbox, Flex, Form, Input, Radio, Rate } from "antd";
import {
  FireFilled,
  HeartFilled,
  HeartOutlined,
  StarFilled,
} from "@ant-design/icons";
function FeedbackPage() {
  const { payload } = useParams();
  console.log("payload", payload);

  function decodePayload(payload) {
    try {
      const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
      const pad =
        normalized.length % 4 === 2
          ? "=="
          : normalized.length % 4 === 3
          ? "="
          : "";
      const b64 = normalized + pad;
      const text = atob(decodeURIComponent(b64));
      return JSON.parse(text);
    } catch (error) {
      console.error("Error decoding payload:", error);
      return null;
    }
  }
  const decoded = decodePayload(payload);
  console.log("decoded", decoded);

  const { data, isLoading, error } = useQuery({
    queryKey: ["business", decoded?.businessId],
    // if (decoded?.businessId) {

    queryFn: async () => {
      const response = await getBusiness(decoded.businessId);
      const result = await response.json();
      return result;
    },
    // }
  });

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size="default"
        style={{ maxWidth: 600 }}
      >
        <Card style={{ width: 300 }}>
          <p>{data.businessName}</p>
          <p>{data.tagLine}</p>
          <Form.Item name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="phoneNo">
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item name="Activity Type">
            <Flex vertical gap="middle">
              <Radio.Group
                block
                optionType="button"
                buttonStyle="solid"
                size="small"
              >
                <Radio block value="dsd">
                  {" "}
                  DSD{" "}
                </Radio>
                <Radio block value="course">
                  {" "}
                  Course{" "}
                </Radio>
                <Radio block value="fundive">
                  {" "}
                  Fundive{" "}
                </Radio>
              </Radio.Group>
            </Flex>
          </Form.Item>
          <Form.Item name="intrestedInOWC">
            <Checkbox>Intrested in OWC</Checkbox>
          </Form.Item>
          <Form.Item name="knownSwimming">
            <Checkbox>Known Swimming</Checkbox>
          </Form.Item>
          <Form.Item name="overAllExperience">
            <Flex vertical gap="middle">
              <Rate character={<FireFilled style={{ color: "orange" }} />} />
              <Rate character={<StarFilled />} />
              <Rate
                character={<HeartFilled style={{ accentColor: "red" }} />}
              />
            </Flex>
          </Form.Item>

          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Form>
      {isLoading ? <h1>Loading...</h1> : <h5>{JSON.stringify(data)}</h5>}
    </>
  );
}

export default FeedbackPage;
