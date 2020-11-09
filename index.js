const horses = {
  horseGroupA: [
    { horseNumber: 1, time: 10, group: 'a' },
    { horseNumber: 2, time: 11, group: 'a' },
    { horseNumber: 3, time: 12, group: 'a' },
    { horseNumber: 4, time: 13, group: 'a' },
    { horseNumber: 5, time: 14, group: 'a' },
  ],
  horseGroupB: [
    { horseNumber: 6, time: 15, group: 'b' },
    { horseNumber: 7, time: 16, group: 'b' },
    { horseNumber: 8, time: 17, group: 'b' },
    { horseNumber: 9, time: 18, group: 'b' },
    { horseNumber: 10, time: 19, group: 'b' },
  ],
  horseGroupC: [
    { horseNumber: 11, time: 20, group: 'c' },
    { horseNumber: 12, time: 21, group: 'c' },
    { horseNumber: 13, time: 22, group: 'c' },
    { horseNumber: 14, time: 24, group: 'c' },
    { horseNumber: 15, time: 24, group: 'c' },
  ],
  horseGroupD: [
    { horseNumber: 16, time: 25, group: 'd' },
    { horseNumber: 17, time: 26, group: 'd' },
    { horseNumber: 18, time: 27, group: 'd' },
    { horseNumber: 19, time: 28, group: 'd' },
    { horseNumber: 20, time: 29, group: 'd' },
  ],
  horseGroupE: [
    { horseNumber: 21, time: 34, group: 'e' },
    { horseNumber: 22, time: 34, group: 'e' },
    { horseNumber: 23, time: 34, group: 'e' },
    { horseNumber: 24, time: 34, group: 'e' },
    { horseNumber: 25, time: 34, group: 'e' },
  ],
}

// change time property to test !!
// change time property to test !!
// change time property to test !!

const run = () => {
  console.log('\n======================== Start ========================\n')
  let countRound = 0
  // const maxHorsePerRound = 5
  const findCondition = (
    array,
  ) =>
    Object.keys(array).map((k) => {
      ++countRound
      return array[k].reduce((prev, curr) => {
        if (curr.time >= Math.max(...array[k].map((h) => h.time))) {
          return [...(prev || []), curr]
        }
      }, [])
    })

  const flatten = (array) =>
    array.reduce((prev, curr) => {
      return prev.concat(Array.isArray(curr) ? flatten(curr) : curr)
    }, [])

  console.log('ม้าอันดับที่ 1 ในแต่ละสาย')
  console.table(findCondition(horses))
  // console.log(JSON.stringify(findCondition(horses), null, 4))
  console.log('firstCountCondition', countRound)
  console.log('\n')

  let nextCountRound = countRound

  const secondCondition = (
    flat,
  ) =>
    flat
      .map((v) => {
        if (v.time >= Math.max(...flat.map((_v) => _v.time))) {
          return v
        }
      })
      .filter(Boolean)

  nextCountRound++
  console.log('ม้าอันดับ 1 ที่แข่งหลังจากการแข่งแบ่งสายเสร็จ')
  console.table(secondCondition(flatten(findCondition(horses))))
  // console.log(JSON.stringify(secondCondition(flatten(findCondition(horses))), null, 4))
  console.log('secondCountCondition', nextCountRound)
  console.log('\n')

  const all = findCondition(horses).flat(2)
  const firstRank = secondCondition(flatten(findCondition(horses)))
  const finalCondition = all
    .filter((v) => !firstRank.includes(v))
    .map((v, i) => {
      const sorted = all
        .filter((v) => !firstRank.includes(v))
        .map((v) => v.time)
        .sort((a, b) => {
          return b - a
        })
      if (
        firstRank.length + i++ < 3 ||
        v.time >= Math.max(...all.filter((v) => !firstRank.includes(v)).map((v) => v.time)) ||
        v.time >= sorted[1]
      ) {
        return v
      }
    })
    .filter(Boolean)
  nextCountRound++
  console.log('อันดับของม้าที่เหลือ (2 และ 3)')
  console.table(finalCondition)
  // console.log(JSON.stringify(finalCondition, null, 4))
  console.log('finalCountCondition', nextCountRound)
  console.log('\n')
}

run()
