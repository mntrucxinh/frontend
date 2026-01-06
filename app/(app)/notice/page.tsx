import dynamic from "next/dynamic";

const SearchNotice = dynamic(()=> import('./_components/SearchNotice'), {
  ssr: false,
  loading: () => <div>Đang tải dữ liệu...</div>
})

async function NoticePage () {
  return (
    <SearchNotice />
  )
}

export default NoticePage;
