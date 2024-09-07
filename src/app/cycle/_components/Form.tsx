import { Form, Input, Row, Col, Button, Radio, Space } from 'antd'

import { GoodIcon, BadIcon } from '@/components/icons/Icons'

import type { BehaviorInstanceComplete } from '@/lib/definitions'
import Image from 'next/image'

interface FormBehaviorProps {
  onSubmit: (values: any) => void
  data?: BehaviorInstanceComplete
}

const FormBehavior: React.FC<FormBehaviorProps> = ({ onSubmit, data }) => {
  const [form] = Form.useForm()

  return (
    <Form onFinish={onSubmit} form={form} initialValues={data}>
      <Row>
        <span className="text-2xl text-center mb-4">Que tipo de comportamiento?</span>
      </Row>
      <Row className="mt-6">
        <Col xs={24} sm={12}>
          <Form.Item key="id" label="ID" name="id" hidden />
          <Form.Item
            key="behavior_id"
            name="behavior_id"
            rules={[{ required: true, message: 'Se requiere un comportamiento' }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="3f6f8852-5a36-4ee7-a3de-2584aa4d3909">
                  <div className="flex gap-2 items-center">
                    <GoodIcon size={25} />
                    <span>Positivo</span>
                  </div>
                </Radio>
                <Radio value="63b8aa35-0d15-43bb-b60a-095c3aa0b0fb">
                  <div className="flex gap-2 items-center">
                    <BadIcon size={25} />
                    <span>Negativo</span>
                  </div>
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="Nota" key="note" name="note">
            <Input.TextArea placeholder="Ingresar una nota" rows={5} className="bg-primary" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end" className="mt-10">
        <Button htmlType="submit" className="bg-secondary">
          Guardar
        </Button>
      </Row>
    </Form>
  )
}

export default FormBehavior
