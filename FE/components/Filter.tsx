import Button from '@/components/Button';
import { icons } from '@/constants/icons'
import { useFilter } from '@/context/FilterContext';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native'

const Filter = () => {
    const [categoriesFilter, setCategoriesFilter] = useState<number[]>([]);
    const [filter, setFilter] = useState<string[]>([]);
    const [priceFilter, setPriceFilter] = useState<string[]>([]);

    const { closeFilter } = useFilter();
    const toggleCategoriesSelect = (item: number) => {
        if (categoriesFilter.includes(item)) {
            setCategoriesFilter(categoriesFilter.filter((x) => x !== item));
        } else {
            setCategoriesFilter([...categoriesFilter, item]);
        }
    };
    const toggleFilter = (item: string) => {
        if (filter.includes(item)) {
            setFilter(filter.filter((x) => x !== item));
        } else {
            setFilter([...filter, item]);
        }
    };
    const togglePriceSelect = (item: string) => {
        if (priceFilter.includes(item)) {
            setPriceFilter(priceFilter.filter((x) => x !== item));
        } else {
            setPriceFilter([...priceFilter, item]);
        }
    };

    const handleFilter = () => {
        console.log(categoriesFilter, filter, priceFilter)
    }
    return (
        <View className='p-[20px] w-[374px] h-[650px] bg-white absolute mt-[120px] rounded-[12px]'>
            <View className='flex-row justify-between items-center'>
                <Text className='text-[17px]'>Filter your search</Text>
                <TouchableOpacity
                    onPress={() => closeFilter()}
                    className='w-[45px] h-[45px] rounded-full items-center justify-center bg-[#ECF0F4]'>
                    <Image
                        tintColor="#181C2E"
                        source={icons.close} resizeMode='contain' className='w-[12px] h-[12px] rotate-180'
                    />
                </TouchableOpacity>
            </View>

            <View className='mt-[19px]'>
                <Text className='uppercase'>Categories</Text>
                <View className='flex-row flex-wrap gap-[10px] mt-[13px]'>
                    {categories.map((value) => {
                        const isSelected = categoriesFilter.includes(value.id);
                        return (
                            <FilterItem
                                target={value.id}
                                key={value.id}
                                title={value.name}
                                isSelected={isSelected}
                                onPress={toggleCategoriesSelect}
                            />
                        )
                    })}
                </View>
            </View>

            <View className='mt-[32px]'>
                <Text className='uppercase'>Filter by</Text>
                <View className='flex-row flex-wrap gap-[10px] mt-[13px]'>
                    {filterData.map((value) => {
                        const isSelected = filter.includes(value);
                        return (
                            <FilterItem
                                target={value}
                                key={value}
                                title={value}
                                isSelected={isSelected}
                                onPress={toggleFilter}
                            />
                        )
                    })}
                </View>
            </View>

            <View className='mt-[32px]'>
                <Text className='uppercase'>Price</Text>
                <View className='flex-row flex-wrap gap-[10px] mt-[13px]'>
                    {priceData.map((value) => {
                        const isSelected = priceFilter.includes(value);
                        return (
                            <FilterItem
                                target={value}
                                key={value}
                                title={value}
                                isSelected={isSelected}
                                onPress={togglePriceSelect}
                            />
                        );
                    })}
                </View>
            </View>

            <View className='mt-auto'>
                <Button
                    onPress={handleFilter}
                    title='Filter'
                    size='large'
                />
            </View>
        </View>
    )
}

const FilterItem = ({ target, title, isSelected, onPress }: any) => (
    <Pressable
        onPress={() => onPress(target)}
        className={`
        ${isSelected ? 'bg-[#F58D1D]' : 'bg-white'}
    rounded-full px-[15px] h-[46px] min-w-[78px] border-[1px] border-gray-200 items-center justify-center max-w-[150px]
    `}>
        <Text numberOfLines={1} className={`uppercase text-[16px] ${isSelected ? 'text-white' : ""}`}>{title}</Text>
    </Pressable>
)
const filterData = [
    "available", "rate"
]
const priceData = [
    "$", "$$", "$$$"
]
const categories: Category[] = [
    {
        id: 1,
        name: 'Tung tung tung shaur',
        note: 'A popular fast food with sausage and bun.',
        createdAt: '2025-05-01T09:00:00.000Z',
        image: ""
    },
    {
        id: 2,
        name: 'Pizza',
        note: 'An Italian baked dish with various toppings.',
        createdAt: '2025-05-02T09:00:00.000Z',
        image: ""
    },
    {
        id: 3,
        name: 'Sushi',
        note: 'A Japanese dish made with rice and fresh seafood.',
        createdAt: '2025-05-03T09:00:00.000Z',
        image: ""
    },
    {
        id: 4,
        name: 'Burger',
        note: 'An American sandwich with meat, cheese, and veggies.',
        createdAt: '2025-05-04T09:00:00.000Z',
        image: ""
    },
    {
        id: 5,
        name: 'Salad',
        note: 'A healthy mix of vegetables, great for diets.',
        createdAt: '2025-05-05T09:00:00.000Z',
        image: ""
    }
];
export default Filter