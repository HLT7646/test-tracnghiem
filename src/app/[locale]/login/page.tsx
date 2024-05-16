'use client';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, FormProps, Input } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import styles from './login.module.scss'
import Image from 'next/image';
import cameraLogo from '@/assets/img/camera-logo.png';
import bg_img from '@/assets/img/login-bg.jpg';
import { loginFunc } from '@/api/login';
import { showNotiError, showNotiSuccess } from '@/components/Noti/notification';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export default function Login() {
    const router = useRouter();
    const t = useTranslations();
    const [form] = Form.useForm();
    const [values, setValues] = useState<FieldType>({});

    useEffect(() => {
        let fields = {
          username: Cookies.get('username') || '',
          password: Cookies.get('password') || ''
        };
        form.setFieldsValue(fields);
    }, [form]);

    const loginMutation = useMutation(values => loginFunc(values), {
        onSuccess: (res) => {
            Cookies.set('token', res.data.token);
            if(values.remember) {
                Cookies.set('username', values.username!)
                Cookies.set('password', values.password!)
            }
            showNotiSuccess(t('notification.success'), t('login.loginSuccess'));
            router.push("/");
        },
        onError: (error) => {
            console.log(error);
            showNotiError(t('notification.error'), t('login.loginInfoNotTrue'))
        },
    });
    
    const onFinish: FormProps<FieldType>['onFinish'] = async (values:any) => {
        setValues(values);
        await loginMutation.mutate(values)
    };

    const validatePassword = (rule: any, value: string, callback: any) => {
        const regexPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

        if(value) {
            if (value.length < 7) {
                callback(t('login.passMustBeLeast8'))
            }
            if (!regexPassword.test(value)) {
                callback(t('login.passMustBeNumberAndCharacter'));
            }
            callback();
        }
      };
    
    return (
      <div className={styles.login}>
        <div className={styles.login__bg}/>
        <Image src={bg_img} alt='' height={1920} />
        <div className={styles.form__box}>
            <div className={styles.login__logo}>
                <Image src={cameraLogo} alt='' className={styles.logo__img}/>
            </div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                className={styles.login__form}
                onFinish={onFinish}
                form={form}
            >
                <Form.Item<FieldType>
                    name="username"
                    rules={[{ required: true, message: t('login.userRequired') },]}
                >
                    <Input prefix={<UserOutlined />} placeholder={t('login.username')} className={styles.input__text}/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: t('login.passRequired') }, {validator: validatePassword}]}
                >
                    <Input.Password placeholder={t('login.password')} prefix={<UnlockOutlined />} className={styles.input__password}/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ span: 16 }}
                >
                    <Checkbox>{t('login.remember')}</Checkbox>
                </Form.Item>

                <Button type="text" htmlType="submit" className={styles.btn__login + ' uppercase'}>
                    {t('login.login')}
                </Button>
            </Form>
        </div>
      </div>
    )
  }