import { useEffect, useState } from "react"
import styles from "./statsPage.module.scss"
import { statsApi } from "@/shared/api/statsApi"
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Box, Button, Card, CardContent, Grid, Paper, Typography } from "@mui/material"

interface SummaryData {
  totalReviewed: number
  approvedPercentage: number
  rejectedPercentage: number
  averageReviewTime: number
}

interface ActivityData {
  date: string
  approved: number
  rejected: number
  requestChanges: number
}

interface DecisionsData {
  approved: number
  rejected: number
  requestChanges: number
}

export const StatsPage = () => {
    const [period, setPeriod] = useState("month")
    const [summary, setSummary] = useState<SummaryData | null>()
    const [activity, setActivity] = useState<ActivityData[]>()
    const [decisions, setDecisions] = useState<DecisionsData | null>()
    const [categories, setCategories] = useState<Record<string, number>>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [period])

    const COLORS = ['#00C49F', '#FF8042', '#FFBB28']

    const fetchStats = async () => {
        try {
            setLoading(true)
            const [summaryRes, activityRes, decisionsRes, categoriesRes] = await Promise.all([
                statsApi.getSummary({ period }),
                statsApi.getActivity({ period }),
                statsApi.getDecisions({ period }),
                statsApi.getCategories({ period })
            ])

            setSummary(summaryRes.data)
            setActivity(activityRes.data)
            setDecisions(decisionsRes.data)
            setCategories(categoriesRes.data)
        } catch (error) {
            console.error("Ошибка", error)
        } finally {
            setLoading(false)
        }
    }

    const decisionsData = decisions ? [
        {name: "Одобрено", value: decisions.approved},
        {name: "Отклонено", value: decisions.rejected},
        {name: "На доработку", value: decisions.requestChanges},
    ] : []

    const categoriesData = Object.entries(categories || {}).map(([name, value]) => ({
        name,
        value
    }))

    if (loading) {
        return <div>Загрузка</div>
    }

    return(
        <div className={styles.container}>
            <div className={styles.upperContainer}>
                <Typography variant="h6" color="secondary">
                    Статистика за {period === "today" ? "сегодня" : period === "week" ? "7 дней" : "30 дней"}
                </Typography>
                <div className={styles.periodSelector}>
                    <Button
                        variant={period === "today" ? "contained" : "outlined"}
                        onClick={() => setPeriod("today")}
                    >
                        Сегодня
                    </Button>
                    <Button
                        variant={period === "week" ? "contained" : "outlined"}
                        onClick={() => setPeriod("week")}
                    >
                        7 дней
                    </Button>
                    <Button
                        variant={period === "month" ? "contained" : "outlined"}
                        onClick={() => setPeriod("month")}
                    >
                        30 дней
                    </Button>
                </div>
            </div>
            
            <div className={styles.chartsContainer}>
                <ResponsiveContainer width="50%" height={300}>
                    <BarChart data={activity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="approved" fill="#00C49F" name="Одобрено" />
                    <Bar dataKey="rejected" fill="#FF8042" name="Отклонено" />
                    <Bar dataKey="requestChanges" fill="#FFBB28" name="На доработку" />
                    </BarChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="50%" height={300}>
                        <PieChart>
                        <Pie
                            data={decisionsData}
                            cx="45%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent! * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {decisionsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        </PieChart>
                </ResponsiveContainer>
            </div>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
                    gap: 2,
                    mb: 3
                }}
            >
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                {summary?.totalReviewed || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Проверено
                </Typography>
                </Paper>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {Math.round(summary?.approvedPercentage || 0)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Одобрено
                    </Typography>
                </Paper>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {Math.round(summary?.rejectedPercentage || 0)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Отклонено
                    </Typography>
                </Paper>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {summary?.averageReviewTime || 0} секунд
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Cреднее время
                    </Typography>
                </Paper>
            </Box>

            
        </div>
    )
}