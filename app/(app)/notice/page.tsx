import dynamic from "next/dynamic";
import NoticeListSkeleton from './_components/NoticeListSkeleton'

const SearchNotice = dynamic(()=> import('./_components/SearchNotice'), {
  ssr: false,
  loading: () => <NoticeListSkeleton />
})

async function NoticePage () {
  return (
    <SearchNotice />
  )
}

export default NoticePage;
