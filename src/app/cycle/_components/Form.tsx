import { Form, Input, Row, Col, Button, Radio } from 'antd'

import { GoodIcon, BadIcon } from '@/components/icons/Icons'

import type { BehaviorInstance } from '@/lib/definitions'

interface FormBehaviorProps {
  onSubmit: (values: any) => void
  data?: BehaviorInstance
}

const FormBehavior: React.FC<FormBehaviorProps> = ({ onSubmit, data }) => {
  const [form] = Form.useForm()

  return (
    <Form onFinish={onSubmit} form={form} initialValues={data}>
      <Row>
        <Col xs={24} sm={12}>
          <Form.Item key="id" label="ID" name="id" hidden />
          <Form.Item
            label="Comportamiento"
            name="behavior"
            key="behavior"
            rules={[{ required: true, message: 'Se requiere un comportamiento' }]}
          >
            <Radio.Group buttonStyle="solid" className="flex" size="large">
              <Radio.Button value="good" className="flex items-center">
                <GoodIcon size={25} />
              </Radio.Button>
              <Radio.Button value="bad" className="flex items-center">
                <BadIcon size={25} />
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="Nota" name="note" key="note">
            <Input.TextArea placeholder="Ingresar una nota" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end">
        <Button htmlType="submit">Guardar</Button>
      </Row>
    </Form>
  )
}

export default FormBehavior
