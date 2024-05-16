'use client'
import { Button } from 'antd';
import styles from './examFinish.module.scss'
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function ExamFinish() {
    const t = useTranslations();
    const router = useRouter();
    const pathname = usePathname().split('/');

    const data = {
        title: 'Kiểm tra an toàn bảo mật thông tin lần 2',
        trueAnswers: 12,
        wrongAnswers: 3,
        notAnswers: 1,
        totalAnswers: 16
    }

    const handleClick = () => {
        router.push(`/${pathname[1]}/`)
    }

    return (
        <div className={styles.exam_finish + ' grid grid-cols-12'}>
            <div className={styles.modal_result}>
                <h1 className='font-bold mb-8'>{data.title}</h1>
                <div className={styles.modal_content}>
                    <div className={styles.result_question + ' basis-1/2'}>
                        <p className='flex justify-between'>{t('exam.totalTrueAnswers')}: <span>{data.trueAnswers}</span></p>
                        <p className='flex justify-between'>{t('exam.totalWrongAnswers')}: <span>{data.wrongAnswers}</span></p>
                        <p className='flex justify-between'>{t('exam.totalNotTrueAnswers')}: <span>{data.notAnswers}</span></p>
                        <p className='flex justify-between'>{t('exam.totalQuestions')}: <span>{data.totalAnswers}</span></p>
                    </div>
                    <p className='font-bold basis-1/2 text-center'>{t('exam.points')}: {data.trueAnswers * 10}/{data.totalAnswers * 10}</p>
                </div>
                <div className={styles.btn_box}>
                    <Button className={styles.btn_submit} onClick={handleClick}>{t('exam.dashboard')}</Button>
                </div>
            </div>
        </div>
    )
}