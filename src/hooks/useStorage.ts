// import { useCallback, useState, useEffect } from 'react'

// // Lưu user vào Storage nhưng bảo mật hơn, lên web không xem được

// function useStorage(key, defaultValue, storageObject) {
//     console.log('Key: ', key, 'defaultValue: ', defaultValue, 'storageObject: ', storageObject)

//     const [value, setValue] = useState(() => {
//         const jsonValue = storageObject.getItem(key)
//         if (jsonValue !== null) return JSON.parse(jsonValue)

//         if (typeof defaultValue === 'function') {
//             return defaultValue()
//         } else {
//             return defaultValue
//         }
//     })

//     // Memoize the function only when dependencies change
//     const memoizedDefaultValue = useCallback(typeof defaultValue === 'function' ? defaultValue : () => defaultValue, [
//         defaultValue
//     ])

//     // Thêm mã để theo dõi lưu trữ vào và lấy dữ liệu từ localStorage
//     useEffect(() => {
//         if (value === undefined) {
//             storageObject.removeItem(key)
//             console.log(`Item removed from ${storageObject} with key: ${key}`)
//         } else {
//             storageObject.setItem(key, JSON.stringify(value))
//             console.log(`Item set in ${storageObject} with key: ${key}`)
//         }
//     }, [key, value, storageObject])

//     const remove = useCallback(() => {
//         setValue(undefined)
//     }, [])

//     return [value, setValue, remove, memoizedDefaultValue]
// }

// export function useLocalStorage(key, defaultValue) {
//     const [value, setValue, remove, memoizedDefaultValue] = useStorage(key, defaultValue, window.localStorage)
//     return [value, setValue, remove, memoizedDefaultValue]
// }

// export function useSessionStorage(key, defaultValue) {
//     return useStorage(key, defaultValue, window.sessionStorage)
// }
