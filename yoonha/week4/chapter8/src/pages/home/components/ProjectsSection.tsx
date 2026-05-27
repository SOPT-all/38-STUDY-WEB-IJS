import { remap, passtival, noonu, shamrockTales } from '../../../shared/assets'

const projects = [
  {
    title: "구름톤 유니브 4기",
    period: "2025.03 ~ 2025.09",
    description: "구름톤 유니브 9ITHON RE:MAP 참여",
    image: remap,
  },
  {
    title: "Passtival",
    period: "2025.08 ~ 2025.09",
    description:
      "학교 축제의 모든 순간을 하나로 잇는 서비스.\n실제 축제 기간 운영, 누적 조회수 10,000회 이상 달성.",
    image: passtival,
  },
  {
    title: "SOPT 37기 WEB — 합동세미나",
    period: "2025.11",
    description: "데스크탑 웹 2조 눈누",
    image: noonu,
  },
  {
    title: "SOPT 37기 WEB — 솝커톤 웹 대상",
    period: "2025.11",
    description:
      '"하루의 한 줄이, 아일랜드 설화가 되는 순간"\nAI가 짧은 일상을 이야기꾼 스타일의 설화로 변환해주는 웹서비스.',
    image: shamrockTales,
  },
]

const ProjectsSection = () => {
  return (
    <div className="px-6 py-16 bg-gray-50 max-w-sm mx-auto lg:max-w-none lg:px-12 lg:py-20">
      <p className="text-xl font-bold mb-8">프로젝트 경험</p>

      <div className="flex flex-col gap-6">
        {projects.map(({ title, period, description, image }) => (
          <div key={title} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <img
              src={image}
              alt={title}
              className="w-full h-44 object-cover"
            />
            <div className="p-5">
              <h3 className="text-sm font-semibold mb-1">{title}</h3>
              <p className="text-xs text-indigo-400 mb-2">{period}</p>
              <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsSection
