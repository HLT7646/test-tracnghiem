'use client';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, FormProps, Input } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import styles from './login.module.scss'
import Image from 'next/image';
import cameraLogo from '@/assets/img/camera-logo.png';
import bg_img from '@/assets/img/login-bg.jpg';
import bg_img2 from '@/assets/img/bg2.png';
import { loginFunc } from '@/api/login';
import { showNotiError, showNotiSuccess } from '@/components/Noti/notification';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUsername, setEmail, setImage } from '@/redux/reducer/userSlice';
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
    const handleLanguageChange = (event: { target: { value: any; }; }) => {
        const selectedLanguage = event.target.value;
        if (selectedLanguage === 'vi') {
            router.push('/vi/login');
        } else if (selectedLanguage === 'en') {
            router.push('/en/login');
        }
    };
    const dispatch = useDispatch();
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
            console.log(res.data);
            dispatch(setUsername(res.data.username));
            dispatch(setEmail(res.data.email));
            dispatch(setImage(res.data.image));
            if (values.remember) {
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

    const onFinish: FormProps<FieldType>['onFinish'] = async (values: any) => {
        setValues(values);
        await loginMutation.mutate(values)
    };

   

    return (
        <div className={styles.login}>
            <div />
            <Image className={styles.login__bg} src={bg_img} alt='' height={1920} />
            <Image className={styles.login__bg2} src={bg_img2} alt='' height={1920} />
            <div className={styles.form__box}>
                <div className={styles.login__logo}>
                    <Image src={cameraLogo} alt='' className={styles.logo__img} />
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
                        rules={[{ required: true, message: t('login.userRequired') }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder={t('login.username')} className={styles.input__text} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: t('login.passRequired') },
                            {
                                validator: (_, value, callback) => {
                                    const regexPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

                                    if (value && value.length < 7) {
                                        callback(t('login.passMustBeLeast8'));
                                    } else if (value && !regexPassword.test(value)) {
                                        callback(t('login.passMustBeNumberAndCharacter'));
                                    } else {
                                        callback();
                                    }
                                }
                            }
                        ]}
                    >
                        <Input.Password placeholder={t('login.password')} prefix={<UnlockOutlined />} className={styles.input__password} />
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
            <div className={styles.language}>
                <select onChange={handleLanguageChange}>
                    <option value="">Chọn ngôn ngữ</option>
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                </select>
            </div>
        </div>
    )
}