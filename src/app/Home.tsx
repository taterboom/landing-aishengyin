"use client"

import {
  useScroll,
  motion,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  MotionValue,
} from "framer-motion"
import { use, useMemo, useRef, useState } from "react"
import { range } from "lodash"
import { MouseCursor } from "./components/icons"
import Image from "next/image"
import clsx from "classnames"
import { useMeasure } from "react-use"

const STEPS = [
  {
    title: "操作简便",
    description: "对话式的UI，只需输入文字点击合成语音按钮即可。",
    range: [0, 0.25],
  },
  {
    title: "角色丰富",
    description: "男女老少，各种角色任你选。",
    range: [0.35, 0.7],
  },
  {
    title: "多语支持",
    description: "xx+国语言，xx+地方言",
    range: [0.7, 1],
  },
]

function Step1Message(props: { progress: MotionValue<number> }) {
  const opacity = useTransform(props.progress, [0, 1], [0, 1])
  const position = useTransform(props.progress, [0, 1], [16, 0])

  return (
    <motion.div
      className="absolute"
      style={{
        opacity: opacity,
        top: 136,
        left: 11,
        y: position,
      }}
    >
      <Image
        src="/progress/1.png"
        width={368}
        height={76}
        alt=""
        style={{ transform: `scale(0.965)`, transformOrigin: "0 0" }}
      ></Image>
    </motion.div>
  )
}

function Step3Message(props: { progress: MotionValue<number> }) {
  const opacity = useTransform(props.progress, [0, 1], [0, 1])
  const position = useTransform(props.progress, [0, 1], [16, 0])

  return (
    <motion.div
      className="absolute"
      style={{
        opacity: opacity,
        top: 205,
        left: 11,
        y: position,
      }}
    >
      <Image
        src="/progress/3.png"
        width={368}
        height={76}
        alt=""
        style={{ transform: `scale(0.965)`, transformOrigin: "0 0" }}
      ></Image>
    </motion.div>
  )
}
function Step2(props: { progress: MotionValue<number> }) {
  const position = useTransform(props.progress, [0, 0.02, 0.8, 0.82], [8, 0, 0, 8])
  const opacity1 = useTransform(props.progress, [0, 0.02, 0.2, 0.21], [0, 1, 1, 0])
  const opacity2 = useTransform(props.progress, [0.2, 0.21, 0.4, 0.41], [0, 1, 1, 0])
  const opacity3 = useTransform(props.progress, [0.4, 0.41, 0.8, 0.82], [0, 1, 1, 0])
  const [clicked, setClicked] = useState(props.progress.get() > 0.6)
  useMotionValueEvent(props.progress, "change", (v) => {
    if (v > 0.6) {
      setClicked(true)
    } else {
      setClicked(false)
    }
  })
  const backgroundBlur = useTransform(props.progress, (v) => {
    let num = 0
    if (v >= 0 && v <= 0.02) {
      num = Math.min(8, (v / 0.02) * 8)
    } else if (v > 0.02 && v < 0.8) {
      num = 8
    } else if (v >= 0.8 && v <= 0.82) {
      num = 8 - Math.min(8, ((v - 0.8) / 0.02) * 8)
    }
    return `blur(${num}px)`
  })
  const opacity = useTransform(props.progress, (v) => {
    let num = 0
    if (v >= 0 && v <= 0.02) {
      num = v / 0.02
    } else if (v > 0.02 && v < 0.8) {
      num = 1
    } else if (v >= 0.8 && v <= 0.82) {
      num = 1 - (v - 0.8) / 0.02
    }
    return num
  })

  return (
    <motion.div className="absolute inset-0">
      <motion.div
        className="absolute inset-0 bg-base-300/50 backdrop-blur display !mt-0"
        style={{
          // backdropFilter: backgroundBlur,
          opacity: opacity,
        }}
      ></motion.div>
      <motion.div
        className="absolute"
        style={{
          top: 100,
          left: 16,
          y: position,
          opacity: opacity1,
        }}
      >
        <Image
          className="rounded shadow-lg"
          src="/progress/2_1.png"
          width={273}
          height={261}
          alt=""
        ></Image>
      </motion.div>
      <motion.div
        className="absolute"
        style={{
          top: 100,
          left: 16,
          y: position,
          opacity: opacity2,
        }}
      >
        <Image
          className="rounded shadow-lg"
          src="/progress/2_2.png"
          width={273}
          height={261}
          alt=""
        ></Image>
      </motion.div>
      <motion.div
        className="absolute"
        style={{
          top: 100,
          left: 16,
          y: position,
          opacity: opacity3,
          visibility: clicked ? "hidden" : "visible",
        }}
      >
        <Image
          className="rounded shadow-lg"
          src="/progress/2_3.png"
          width={273}
          height={261}
          alt=""
        ></Image>
      </motion.div>
      <motion.div
        className="absolute"
        style={{
          top: 100,
          left: 16,
          y: position,
          opacity: opacity3,
          visibility: clicked ? "visible" : "hidden",
        }}
      >
        <Image
          className="rounded shadow-lg"
          src="/progress/2_4.png"
          width={273}
          height={261}
          alt=""
        ></Image>
      </motion.div>
    </motion.div>
  )
}

function getCurrentStep(progress: number) {
  let currentStep = 0
  for (let i = STEPS.length - 1; i >= 0; i--) {
    const step = STEPS[i]
    if (progress <= step.range[1]) {
      currentStep = i
    }
  }
  return currentStep
}

function getCurrentAppPage(progress: number): 1 | 2 {
  return progress > 0.5 ? 2 : 1
}

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY, scrollYProgress } = useScroll({ target: ref, offset: ["-100px", "end"] })
  const [step, setStep] = useState<number>(() => getCurrentStep(scrollYProgress.get()))
  const [appPage, setAppPage] = useState(() => getCurrentAppPage(scrollYProgress.get()))
  useMotionValueEvent(scrollYProgress, "change", (e) => {
    console.log(e)
    setStep(getCurrentStep(e))
    setAppPage(getCurrentAppPage(e))
  })
  const currentStepInfo = useMemo(() => STEPS[step], [step])
  // 鼠标移动效果
  const mousePositionStops = (() => {
    const stops = [
      [
        [0, 0.05],
        [30, 460],
      ],
      [
        [0.05, 0.1],
        [110, 460],
      ],
      [
        [0.15, 0.2],
        [250, 500],
      ],
      [
        [0.26, 0.3],
        [260, 408],
      ],
      [
        [0.37, 0.39],
        [60, 150],
      ],
      [
        [0.44, 0.45],
        [60, 186],
      ],
      [
        [0.49, 0.51],
        [200, 220],
      ],
      [
        [0.6, 0.62],
        [110, 460],
      ],
      [
        [0.67, 0.69],
        [250, 500],
      ],
    ]
    const start = [[], [250, 600]]
    const progress = [0]
    const x = [250]
    const y = [600]
    for (let i = 0; i < stops.length; i++) {
      const stop = stops[i]
      const prevStop = i === 0 ? start : stops[i - 1]
      progress.push(stop[0][0])
      x.push(prevStop[1][0])
      y.push(prevStop[1][1])
      progress.push(stop[0][1])
      x.push(stop[1][0])
      y.push(stop[1][1])
    }
    return {
      progress,
      x,
      y,
    }
  })()
  const mouseX = useTransform(scrollYProgress, mousePositionStops.progress, mousePositionStops.x)
  const mouseY = useTransform(scrollYProgress, mousePositionStops.progress, mousePositionStops.y)
  // 鼠标隐藏效果
  const mouseOpacityStops = (() => {
    const stops = [[0.05, 0.15]]
    const stopsArr = stops.map((stop) => [
      [stop[0] - 0.002, stop[0], stop[1] - 0.002, stop[1]],
      [1, 0, 0, 1],
    ])
    const inputRange = stopsArr.map((item) => item[0]).flat()
    const outputRange = stopsArr.map((item) => item[1]).flat()
    return [inputRange, outputRange]
  })()
  const mouseOpacity = useTransform(scrollYProgress, mouseOpacityStops[0], mouseOpacityStops[1])
  // 鼠标点击效果
  const mouseScaleStops = (() => {
    const stops = [0.2, 0.3, 0.38, 0.44, 0.5, 0.69]
    const stopsArr = stops.map((stop) => [
      [stop, stop + 0.02, stop + 0.02 * 2],
      [1, 0.6, 1],
    ])
    const inputRange = stopsArr.map((item) => item[0]).flat()
    const outputRange = stopsArr.map((item) => item[1]).flat()
    return [inputRange, outputRange]
  })()
  const mouseScale = useTransform(scrollYProgress, mouseScaleStops[0], mouseScaleStops[1])

  const text = useTransform(scrollYProgress, (v) => {
    const start = 0.05
    const end = 0.15
    const text = "你好，世界"
    if (v >= start && v <= end) {
      return text.slice(0, Math.floor(((v - start) / (end - start)) * text.length))
    } else if (v > end && v <= 0.62) {
      return text
    } else if (v > 0.62 && v <= 0.64) {
      return text.slice(0, text.length - Math.floor(((v - 0.62) / (0.64 - 0.62)) * text.length))
    } else if (v > 0.64 && v <= 0.67) {
      const text = "Hello world"
      return text.slice(0, Math.floor(((v - 0.64) / (0.67 - 0.64)) * text.length))
    } else {
      return "Hello world"
    }
  })

  const step1MessageProgress = useTransform(scrollYProgress, [0.24, 0.26], [0, 1])
  const step2Progress = useTransform(scrollYProgress, [0.34, 0.64], [0, 1])
  const step3MessageProgress = useTransform(scrollYProgress, [0.72, 0.74], [0, 1])

  return (
    <div className="" ref={ref}>
      <div className="h-[600vh]">
        <div className="sticky top-0 pl-12 min-h-16">
          <AnimatePresence>
            <motion.div
              className="absolute"
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
            >
              <h3>{currentStepInfo.title}</h3>
              <p>{currentStepInfo.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="sticky bottom-4" style={{ perspective: 1000 }}>
        <div className="relative" style={{ maxWidth: 925 }}>
          <div className="mockup-phone relative left-1/2 -translate-x-1/2">
            <div className="display !mt-0 relative">
              <Image
                className={clsx("border border-black/10 rounded-xl", appPage !== 1 && "hidden")}
                src="/progress/home1.png"
                width={311}
                height={550}
                alt=""
              ></Image>
              <Image
                className={clsx("border border-black/10 rounded-xl", appPage !== 2 && "hidden")}
                src="/progress/home2.png"
                width={311}
                height={550}
                alt=""
              ></Image>
              <motion.div
                className="absolute z-30"
                style={{ left: mouseX, top: mouseY, opacity: mouseOpacity, scale: mouseScale }}
              >
                <MouseCursor />
              </motion.div>
              <motion.div
                className="absolute"
                style={{
                  left: 30,
                  top: 460,
                }}
              >
                {text}
              </motion.div>
              <Step1Message progress={step1MessageProgress} />
              <Step2 progress={step2Progress} />
              <Step3Message progress={step3MessageProgress} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
