import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBusiness } from "../services/api";
import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Radio,
  Rate,
  Typography,
  Row,
  Col,
  Space,
} from "antd";

import { sliderDesigns } from "../common.ts";
function FeedbackPage() {
  const [activityType, setActivityType] = useState("");
  const [interestedInOWC, setInterestedInOWC] = useState(false);
  const [experience, setExperience] = useState(0);
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
const handleSubmit = (values) => {
    values.overAllExperience = experience;
    console.log("Form Values:", values);
    // console.log("Form experience:", experience);
    // Here you can handle the form submission, e.g., send data to an API
  };

  return (
    <>
      <Row style={{ marginTop: "20px" }}>
        <Col span={2} />
        <Col span={20}>
          <Form
            // labelCol={{ span: 4 }}
            // wrapperCol={{ span: 14 }}
            layout="horizontal"
            size="default"
            style={{ width: "100%" }}
            onFinish={handleSubmit}
            
        
          >
            <Card loading={isLoading} size="small" hoverable={true}>
              <div style={{ textAlign: "center", marginBottom: 10 }}>
                <Typography.Title level={4} style={{ marginBottom: 4 }}>
                  {data?.businessName}
                </Typography.Title>
                <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
                  {data?.tagLine}
                </Typography.Paragraph>
              </div>
              <Form.Item name="email">
                <Input size="small" placeholder="Email" />
              </Form.Item>
              <Form.Item name="phoneNo">
                <Input size="small" placeholder="Phone Number" />
              </Form.Item>
              <Form.Item name="Activity Type">
                <Flex vertical gap="middle">
                  <Radio.Group
                    block
                    optionType="button"
                    buttonStyle="solid"
                    size="small"
                    onChange={(e) => {
                      setActivityType(e.target.value);
                      setInterestedInOWC(false); // reset if type changes
                    }}
                    value={activityType}
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
              {activityType === "dsd" && (
                <Form.Item name="intrestedInOWC" valuePropName="checked">
                  <Checkbox
                  valuePropName="checked"
                    checked={interestedInOWC}
                    onChange={(e) => setInterestedInOWC(e.target.checked)}
                  >
                    Intrested in OWC
                  </Checkbox>
                </Form.Item>
              )}
              {interestedInOWC && (
                <Form.Item valuePropName="checked" name="knownSwimming" >
                  <Checkbox >Known Swimming</Checkbox>
                </Form.Item>
              )}
              <Form.Item name="overAllExperience" valuePropName="checked" >
                <Typography.Text> Overall Experience </Typography.Text>
                <Rate
                valuePropName="checked" 
                  value={experience}
                  onChange={setExperience}
                  character={({ index }) => {
                    const { Icon, color } =
                      sliderDesigns[data?.sliderDesign] || sliderDesigns.star; // fallback
                    const filled = index < (experience || 0);
                    return (
                      <Icon style={{ color: filled ? color : "#d9d9d9" }} />
                    );
                  }}
                ></Rate>
              </Form.Item>
              <Form.Item name="comments">
                <Input.TextArea
                  placeholder="Feedback Comments"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
              <Form.Item >
                <div style={{ textAlign: "center", marginBottom: 16 }}>
                  <Button
                    style={{ alignContent: "center" }}
                    placeholder="submit"
                    type="primary"
                    htmlType="submit"
                  >
                    Submit Feedback
                  </Button>
                </div>
              </Form.Item>
            </Card>
          </Form>
        </Col>
        <Col span={2} />
      </Row>
    </>
  );
}

export default FeedbackPage;
