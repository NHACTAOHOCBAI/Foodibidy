
import SearchInput from '@/components/SearchInput'
import TextDefault from '@/components/TextDefault'
import { icons } from '@/constants/icons'
import { Image, Text, View } from 'react-native'


const index = () => {
  return (
    <View className='flex-1 bg-slate-500 px-[24px] items-center '>
      {/* header */}
      <View className='absolute h-[250] bg-white w-full '>

        <View className='flex-row mt-[54px] items-center'>
          <Image
            className='w-[45px] h-[45px] rounded-full bg-accent'
          />

          <View className='ml-[18px] gap-[3px]'>
            <Text className='font-bold uppercase text-[12px] text-primary'>Deliver to</Text>
            <View className='flex-row items-center gap-[9px]'>
              <Text className='text-[#676767]'>Halal Lab office</Text>
              <Image source={icons.triangle} resizeMode='contain' className='w-[10px] h-[10px]' />
            </View>
          </View>

          <View className='ml-auto w-[45px] h-[45px] rounded-full items-center justify-center bg-secondary'>
            <Image source={icons.bag} resizeMode='contain' className='w-[24px] h-[24px]' />
          </View>
        </View>

        <View className='mt-[24px]' >
          <Text className='text-[16px] text-[#1E1D1D]'>Hey Halal, <Text className='font-bold'>Good Afternoon!</Text></Text>
        </View>

        <View className='mt-[16px]'>
          <SearchInput placeholder=' Search for food, groceries, drinks...' />
        </View>



      </View>
    </View>
  )
}

export default index
