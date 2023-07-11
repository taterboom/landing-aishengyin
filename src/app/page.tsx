import Image from "next/image"
import clsx from "classnames"
import { SolarSoundwaveBold } from "./components/icons"
import { LogoImg, LogoText } from "./components/Logo"
import FeaturePerformance from "./Home"

function StartTextInput(props: { defaultValue?: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <input className="w-48 relative"></input>
        <div className="text-center text-[#666666] absolute top-2 left-2 h-4">
          {props.defaultValue}
        </div>
      </div>
      <button>
        <SolarSoundwaveBold />
      </button>
    </div>
  )
}

function FeatureItem(
  props: {
    cover: string
    title: string
    description: string
  } & React.HTMLAttributes<HTMLDivElement>
) {
  return (
    <section className={clsx("space-y-4 p-4", props.className)}>
      <img src={props.cover} alt="" />
      <h3 className="">{props.title}</h3>
      <p>{props.description}</p>
    </section>
  )
}

// export default function Home() {
export default function Home() {
  // return <FeaturePerformance />
  return (
    <>
      <header className="flex flex-row justify-between gap-4 relative items-center mb-6 mx-4">
        <div className="flex gap-4 items-center">
          <LogoImg width={64} height={64} />
          <LogoText width={78} />
        </div>
        <nav className="flex items-center gap-4">
          <div className="text-center relative w-16 shrink-0">使用指南</div>
          <div className="text-center relative w-16 shrink-0">联系我们</div>
          <div className="text-center relative w-8 shrink-0">登录</div>
        </nav>
      </header>
      <main>
        <section className="flex flex-col justify-center items-center gap-4">
          <div className="text-center text-xl relative mx-12">xxx</div>
          {/* <div className="relative">
            <Image
              className="border border-black/10 rounded-xl"
              src="/app.png"
              width={925}
              height={606}
              alt=""
            ></Image>
            <div className="mockup-phone absolute right-32 top-16 ">
              <div className="camera"></div>
              <div className="display !mt-0">
                <Image
                  className="border border-black/10 rounded-xl"
                  src="/progress/home1.png"
                  width={311}
                  height={550}
                  alt=""
                ></Image>
              </div>
            </div>
          </div> */}
        </section>
        <FeaturePerformance />
        <div className="h-[100vh]">
          <div className="self-center flex flex-row justify-start mb-5 gap-4 relative items-center">
            <LogoImg width={64} height={64} />
            <LogoText width={78} />
          </div>
          <StartTextInput defaultValue="快来体验一下吧～" />
        </div>
      </main>
      <footer className="self-center flex flex-row justify-between items-center">
        <div className="text-center relative w-16 shrink-0">公安备案</div>
        <div className="text-center relative w-4 shrink-0">｜</div>
        <div className="text-center relative w-16 shrink-0">隐私政策</div>
        <div className="text-center relative w-16 shrink-0">使用条款</div>
      </footer>
    </>
  )
}
