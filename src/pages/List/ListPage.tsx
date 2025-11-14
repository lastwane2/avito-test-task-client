import { ItemCard } from "@/widgets/Card"
import styles from "./listPage.module.scss"
import { FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material"
import { ChangeEventHandler, useState } from "react"
import { motion } from "framer-motion";

const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'books', name: 'Books' },
    { id: 'home', name: 'Home & Kitchen' },
    { id: 'sports', name: 'Sports & Outdoors' }
];

const statuses = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'books', name: 'Books' },
    { id: 'home', name: 'Home & Kitchen' },
    { id: 'sports', name: 'Sports & Outdoors' }
];


export const ListPage = () => {
    const [category, setCategory] = useState<string>("")
    const [status, setStatus] = useState<string>("")

    const handleCategoryChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setCategory(event.target.value)
    }

    const handleStatusChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setStatus(event.target.value)
    }

    return(
        <>
            <div className={styles.filters}>
                <FormControl sx={{width : 1/7}}>
                    <InputLabel id="status-select-label">Статус</InputLabel>
                    <Select
                        labelId="status-select-label"
                        id="status-select"
                        value={status}
                        label="statuses"
                        onChange={handleStatusChange}
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
                        value={category}
                        label="Category"
                        onChange={handleCategoryChange}
                    >
                        {categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div className={styles.price}>
                    <Input
                        placeholder="Нижняя граница"
                    />
                    <Input
                        placeholder="Верхняя граница"
                    />
                </div>

                <Input
                    placeholder="Поиск"
                />
            </div>
            <motion.div
                className={styles.container}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <ItemCard/>
            </motion.div>
        </>
    )
}