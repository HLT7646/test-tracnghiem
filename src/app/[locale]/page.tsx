'use client'
import SideBar from '@/components/Sidebar/sidebar'
import { Input, Dropdown, Button, Space, Pagination, Select, AutoComplete } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';
import styles from './dashboard.module.scss'
import Image from 'next/image';
import RingIcon from '@/assets/img/clock-icon.png'
import RewardIcon from '@/assets/img/reward-icon.png'
import Cookies from 'js-cookie';
import { redirect, useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { PaginationProps } from 'antd';
import { DataType, dummyData } from '@/data/dummy';
import { DIFFICULTY, DEFAULT_LIMIT, STAR_MAX } from '@/constant';
import { useTranslations } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
export default function Home() {
  const { Search } = Input;
  const { Option } = Select;
  
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [data, setData] = useState<Array<DataType>>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const isCookies = Cookies.get('token');


  const saveSearchTerm = (term: string) => {
    const previousSearches = JSON.parse(localStorage.getItem('searches') ?? '[]') as string[];
    if (!previousSearches.includes(term)) {
      previousSearches.push(term);
      localStorage.setItem('searches', JSON.stringify(previousSearches));
    }
  };
  useEffect(() => {
    const getSearchSuggestions = () => {
      const previousSearches = JSON.parse(localStorage.getItem('searches') || '[]');
      return previousSearches;
    };

    setSearchSuggestions(getSearchSuggestions());
  }, []);


  useEffect(() => {
    const firstIndex = (page - 1) * DEFAULT_LIMIT;
    const filteredData = dummyData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const dataEntry = filteredData.slice(firstIndex, firstIndex + DEFAULT_LIMIT);
    setData(dataEntry);
  }, [page, searchTerm]);

  const createQueryString = useCallback((name: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(name, value)
    } else {
      params.delete(name);
    }
    return params.toString()
  }, [searchParams]);

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    setSearchTerm(value);
    setPage(1);
    saveSearchTerm(value);
    router.push(pathname + '?' + createQueryString('search', value))
  };

  const onSelect = (value: string) => {
    router.push(pathname + '?' + createQueryString('select', value))
  };

  const onChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
    if (page !== 1) {
      router.push(pathname + '?' + createQueryString('page', page.toString()))
    } else {
      router.push(pathname + '?' + createQueryString('page'))
    }
  };
  const options = searchSuggestions
  .filter((suggestion) => suggestion !== '') 
  .map((suggestion, index) => ({
    label: suggestion,
    value: suggestion,
    key: index,
  }));

  return (
    <div className={styles.layout}>
      <SideBar />
      <div className={styles.dashboard}>
        <div className={styles.filter}>
          <AutoComplete
          
            style={{width:'100%'}}
            options={options}
            
          >
            <Search
              placeholder={t('dashboard.search')}
              allowClear
              defaultValue={searchParams.get('search') || ''}
              onSearch={onSearch}
              className={styles.search__bar}
            />
             </AutoComplete>
            <Select
              onChange={onSelect}
              value={searchParams.get('select') || t('dashboard.difficulty')}
              allowClear
            >
              {DIFFICULTY.map(item => (
                <Option key={item.value} value={item.value} label={t(`dashboard.${item.label}`)}>
                  {t(`dashboard.${item.label}`)}
                </Option>
              ))}
            </Select>
        </div>
        <div className={styles.content + ' grid grid-cols-2 gap-10 justify-items-center'}>
          {data.map(item => {
            const starFill = Array.from({ length: item.difficult }, (v, i) => <StarFilled key={i} />)
            const starEmpty = Array.from({ length: (STAR_MAX - item.difficult) }, (v, i) => <StarOutlined key={i} />)
            return (
              <div className={styles.content_card + ' w-10/12 cursor-pointer'} key={item.id} onClick={() => router.push(`${locale}/exam`)}>
                <p className='font-medium mb-1'>{item.name}</p>
                <div className='flex w-full'>
                  <p className='flex text-sm items-center mr-6'><Image src={RingIcon} alt='' className={styles.content_icon} /> {item.time} {t('dashboard.minutes')}</p>
                  <p className='flex text-sm items-center'><Image src={RewardIcon} alt='' className={styles.content_icon} /> {item.minPoint}/{item.maxPoint} {t('dashboard.points')}</p>
                </div>
                <div className='flex text-2xl pt-4'>
                  {starFill} {starEmpty}
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.pagination}>
          <Pagination defaultCurrent={page} total={50} onChange={onChange} />
        </div>
      </div>
    </div>
  )
}
