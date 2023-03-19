import { ref } from 'vue'

const config = {
  point: ref(
    '[{"longitude":104.15366, "latitude":30.68140, "color":"#dfa", "info":"成都理工大学"}, {"longitude":116.43355 , "latitude":39.90946,"info":"北京" }]',
  ),
  ScatterColor: ref('#409EFF'),
  AreaColor: ref('#fff'),
  bgColor: ref('#fff'),
  symbolSize: ref(12),
}

export default config
