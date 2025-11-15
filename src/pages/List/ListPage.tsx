//todo - debounce

import { ItemCard } from "@/widgets/Card"
import styles from "./listPage.module.scss"
import { FormControl, Input, InputLabel, MenuItem, Select, Pagination, Button } from "@mui/material"
import { ChangeEventHandler, useEffect, useState } from "react"
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { getAds } from "@/shared/slices/adsSlice";

//Не нашел категории, но их вроде 8
const categories = [
    { id: 0, name: '1' },
    { id: 1, name: '2' },
    { id: 2, name: '3' },
    { id: 3, name: '4' },
    { id: 4, name: '5' },
    { id: 5, name: '6' },
    { id: 6, name: '7' },
    { id: 7, name: '8' },
];

const statuses = [
    { id: 'pending', name: 'Pending' },
    { id: 'approved', name: 'Approved' },
    { id: 'rejected', name: 'Rejected' },
    { id: 'draft', name: 'Draft' }
];

const sortBy = [
    { id: 'createdAt', name: 'По созданию' },
    { id: 'price', name: 'По цене' },
    { id: 'priority', name: 'По проиоритету' }
];

const order = [
    { id: 'asc', name: 'По возрастанию' },
    { id: 'desc', name: 'По убыванию' },
];


export const ListPage = () => {
    const dispatch = useAppDispatch()
    const {pagination, loading, items: ads} = useAppSelector(state => state.ads)

    const [filters, setFilters] = useState({
        status: "",
        categoryId: "",
        minPrice: "",
        maxPrice: "", 
        search: "",
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc"
    })

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setFilters(prev => ({...prev, page: value}));
    }

    const handleStatusChange = (value: string) => {
        setFilters(prev => ({...prev, status: value, page: 1}))
    }

    const handleCategoryChange = (value: string) => {
        setFilters(prev => ({...prev, categoryId: value, page: 1}))
    }

    const handleMinPriceChange = (value: string) => {
        setFilters(prev => ({...prev, minPrice: value, page: 1}))
    }

    const handleMaxPriceChange = (value: string) => {
        setFilters(prev => ({...prev, maxPrice: value, page: 1}))
    }

    const handleSearchChange = (value: string) => {
        setFilters(prev => ({ ...prev, search: value, page: 1 }))
    }

    const handleSortByChange = (value: string) => {
        setFilters(prev => ({ ...prev, sortBy: value, page: 1 }))
    }

    const handleOrderByChange = (value: string) => {
        setFilters(prev => ({ ...prev, sortOrder: value, page: 1 }))
    }
    

    useEffect(() => {
        const cleanFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => 
                value !== "" && value !== null && value !== undefined && value !== -1
            )
        )

        dispatch(getAds(cleanFilters))
    }, [dispatch, filters])

    return(
        <>
            <div className={styles.filters}>
                <FormControl sx={{width : 1/7}}>
                    <InputLabel id="status-select-label">Статус</InputLabel>
                    <Select
                        labelId="status-select-label"
                        id="status-select"
                        value={filters.status}
                        label="statuses"
                        onChange={(e) => handleStatusChange(e.target.value)}
                    >
                        {statuses.map(status => (
                            <MenuItem key={status.id} value={status.id}>
                                {status.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <FormControl sx={{width : 1/7}}>
                    <InputLabel id="category-select-label">Категория</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="category-select"
                        value={filters.categoryId}
                        label="Category"
                        onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                        {categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{width : 1/7}}>
                    <InputLabel id="order-select-label">Порядок</InputLabel>
                    <Select
                        labelId="order-select-label"
                        id="order-select"
                        value={filters.sortOrder}
                        label="Order"
                        onChange={(e) => handleOrderByChange(e.target.value)}
                    >
                        {order.map(ord => (
                            <MenuItem key={ord.id} value={ord.id}>
                                {ord.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{width : 1/7}}>
                    <InputLabel id="sort-by-select-label">Соритровать по</InputLabel>
                    <Select
                        labelId="sort-by-select-label"
                        id="sort-by-select"
                        value={filters.sortBy}
                        label="Sort by"
                        onChange={(e) => handleSortByChange(e.target.value)}
                    >
                        {sortBy.map(sort => (
                            <MenuItem key={sort.id} value={sort.id}>
                                {sort.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div className={styles.price}>
                    <Input
                        placeholder="Нижняя граница"
                        value={filters.minPrice}
                        onChange={(e) => handleMinPriceChange(e.target.value)}
                        type="number"
                    />
                    <Input
                        placeholder="Верхняя граница"
                        value={filters.maxPrice}
                        onChange={(e) => handleMaxPriceChange(e.target.value)}
                        type="number"
                    />
                </div>

                <Input
                    placeholder="Поиск"
                    value={filters.search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />

                <Button
                    onClick={() => {
                        setFilters({
                            status: "",
                            categoryId: "", 
                            minPrice: "",
                            maxPrice: "",
                            search: "",
                            page: 1,
                            limit: 10,
                            sortBy: "createdAt",
                            sortOrder: "desc"
                        })
                    }}
                >
                    Сброс
                </Button>
            </div>
            <motion.div
                className={styles.container}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {loading ? (
                        <div>Загрузка...</div>
                    ) : ads.length === 0 ? (
                        <div>Нет объявлений</div>
                    ): (
                            <>
                                {ads.map((ad) => 
                                <ItemCard 
                                    key={ad.id} 
                                    ad={ad}
                                />)}
                                <Pagination
                                    className={styles.pagination}
                                    page={pagination.currentPage}
                                    count={pagination.totalPages}
                                    onChange={handlePageChange}
                                />
                            </>
                        )
                }   
            </motion.div>
        </>
    )
}