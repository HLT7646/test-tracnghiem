'use client'
import { Input, Button, Checkbox, Modal } from 'antd';
import styles from './exam.module.scss'
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Exam() {
    const { Search } = Input;
    const t = useTranslations();
    const router = useRouter();
    const pathname = usePathname().split('/');
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const dataContent = {
        id: 3,
        question: "Nhân viên chính thức của công ty Amela được nghỉ phép (có hưởng lương) bao nhiêu ngày một năm?",
        answers: [
            "12 ngày nếu làm đủ cả năm",
            "16 ngày nếu làm đủ cả năm",
            "Không có nghỉ phép vẫn hưởng lương",
            "8 ngày nếu làm đủ cả năm"
        ]
    };

    const questionsListLength = 16;
    const questionDone = [1, 2, 4, 7];
    const questionActive = 3;

    const questionList = Array.from({ length: questionsListLength }, (v, i) => {
        if (i === questionActive - 1) {
            return (
                <div key={i} className={styles.question_item + ' ' + styles.question_active}>
                    <a>{i + 1}</a>
                </div>)
        } else {
            return (
                <div key={i} className={styles.question_item + ' ' + (questionDone.includes(i + 1) ? styles.question_done : '')}>
                    <a>{i + 1}</a>
                </div>)
        }
    });

    const [value, setValue] = useState("");

    function handleChange(checkedValues: any) {
        setValue(checkedValues.target.value);
    }

    const handleSidebarToggle = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className={styles.exam + ' grid grid-cols-12'}>
            <div className={styles.container + ' col-span-9 grid grid-rows-6'}>
                <header className={styles.header + ' row-span-1'}>
                    <p className={styles.header_title + ' font-bold mb-2'}>Kiểm tra an toàn bảo mật thông tin lần 2</p>
                    <p className='mb-1'>{t('exam.timeLeft')}: 14 {t('exam.minutes')} 22 {t('exam.seconds')}</p>
                    <div className={styles.time_bar}>
                        <div className={styles.time_left}></div>
                    </div>
                </header>
                <div className={styles.content + ' row-span-5'}>
                    <div className={styles.question_box}>
                        <p className='font-bold mb-7'>{t('exam.question')} {dataContent.id}. {dataContent.question}</p>
                        <div className={styles.answer_list}>
                            {dataContent.answers.map((answer, index) => (
                                <div key={index} className={styles.answer}>
                                    <Checkbox
                                        onChange={handleChange}
                                        checked={answer === value}
                                        value={answer}
                                    />{String.fromCharCode(index + 65)}. {answer}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.btn_list + ' flex '}>
                        <Button className={styles.btn_pre}>{t('exam.backQuestion')}</Button>
                        <Button className={styles.btn_next}>{t('exam.nextQuestion')}</Button>
                    </div>
                </div>
            </div>
            {!isMobile ? (
                <div className={styles.sidebar + ' col-span-3'}>
                    <div className={styles.question_list + ' grid grid-cols-5 gap-3'}>
                        {questionList}
                    </div>
                    <div className={styles.btn_box}>
                        <Button className={styles.btn_submit} onClick={() => router.push(`/${pathname[1]}/exam/finish`)}>{t('exam.submit')}</Button>
                    </div>
                </div>
            ) : (
               
                <Button className={styles.sidebar_toggle} onClick={handleSidebarToggle}>
                   Chuyển đến
                </Button>
           
            )}
            <Modal
                visible={sidebarVisible}
                onCancel={handleSidebarToggle}
                footer={null}
                centered
            >
                <div className={styles.popup}>
                <div className={styles.question_list_2}>
                    {questionList}
                </div>
                
                <Button onClick={() => { router.push(`/${pathname[1]}/exam/finish`); handleSidebarToggle(); }}>{t('exam.submit')}</Button>
                
                </div>
            </Modal>
        </div>
    );
}
