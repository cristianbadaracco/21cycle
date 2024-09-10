import { Button, Form, Input, DatePicker, Row, Col } from 'antd'
import dayjs from 'dayjs'

import { USER_ID } from '@/lib/constants'
import type { Cycle } from '@/lib/definitions'
import { uuidv4 } from '@/lib/utils'

interface CycleFormProps {
  onSubmit: (cycle: Cycle) => void
  initialValues?: Cycle
  loading?: boolean
}

const CycleForm: React.FC<CycleFormProps> = ({ onSubmit, initialValues, loading = false }) => {
  const [form] = Form.useForm()

  const onFinish = (values: any): void => {
    const cycle: Cycle = {
      id: initialValues?.id ?? uuidv4(),
      start_date: values.start_date?.toDate(),
      end_date: dayjs(values.start_date as Date)
        .add(21, 'day')
        .toDate(),
      user_id: USER_ID,
      name: values.name,
    }

    onSubmit(cycle)
  }

  return (
    <>
      <Row justify={'center'} className="mb-8">
        <Col>
          <span className="text-2xl mb-4">Agregar Ciclo</span>
        </Col>
      </Row>
      <Row>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            start_date: initialValues !== undefined ? dayjs(initialValues.start_date) : null,
            end_date: initialValues !== undefined ? dayjs(initialValues.end_date) : null,
            user_id: initialValues?.user_id,
            name: initialValues?.name,
          }}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="ID de Usuario" name="user_id" hidden>
                <Input placeholder="Ingrese el ID de usuario" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Nombre" name="name">
                <Input placeholder="Ingrese el nombre del ciclo" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Fecha de Inicio"
                name="start_date"
                rules={[{ required: true, message: 'Por favor, seleccione la fecha de inicio' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Fecha de Fin" name="end_date" hidden>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end" className="mt-20">
            <Col>
              <Button htmlType="submit" className="bg-secondary" loading={loading}>
                Guardar
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </>
  )
}

export default CycleForm
