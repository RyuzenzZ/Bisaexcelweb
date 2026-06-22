import { ArrowLeft, ArrowRight, BookOpen, Brain, BriefcaseBusiness, CheckCircle2, Clock, FileText, ListChecks, PlayCircle, Target } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorState } from '@/components/shared/ErrorState'
import { LoadingState } from '@/components/shared/LoadingState'
import { PageMeta } from '@/components/shared/PageMeta'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { articleCategories, learningRoadmap, workCaseStudies, type Article } from '@/data/articles'
import { useAsyncData } from '@/hooks/useAsyncData'
import { articlesService } from '@/services/articlesService'

export function BelajarPage() {
  const loadArticles = useCallback(() => articlesService.getAllResult(), [])
  const { data: articles, isLoading, isFallback, error, reload } = useAsyncData(loadArticles)
  const publishedArticles = useMemo(() => [...(articles ?? [])].sort((a, b) => a.orderIndex - b.orderIndex), [articles])
  const firstArticleSlug = publishedArticles[0]?.slug ?? 'mindset-belajar-excel-dari-nol'

  return (
    <PublicLayout>
      <PageMeta title="Belajar Excel dari Nol" />
      <section className="hero-grid pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-green-700/50 bg-green-950/60 px-3 py-1 text-xs font-bold text-green-300">Belajar lewat artikel</span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-[#E8F0EA] sm:text-6xl">Belajar Excel dari Nol, Pelan-Pelan Sampai Paham</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#8BA98F] sm:text-lg">Mulai dari cara berpikir Excel, memahami data, membuat tabel yang rapi, memakai rumus dasar, sampai membaca studi kasus kerja sederhana.</p>
              <div className="mt-6 flex flex-wrap gap-2">{['Cocok untuk pemula', 'Dibaca bertahap', 'Bahasa sederhana', 'Berbasis kerja nyata'].map((badge) => <span className="rounded-full border border-[#254A2A] bg-[#111E14] px-3 py-1.5 text-xs font-bold text-green-300" key={badge}>{badge}</span>)}</div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg"><Link to={ROUTES.LEARN_DETAIL(firstArticleSlug)}>Mulai dari Materi Pertama<ArrowRight className="h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline"><a href="#mulai-dari-materi-ini">Mulai dari Materi Ini</a></Button>
              </div>
            </div>
            <div className="rounded-2xl border border-[#254A2A] bg-[#111E14] p-5 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-400">Cara belajar yang disarankan</p>
              <p className="mt-3 text-sm leading-6 text-[#8BA98F]">Kalau kamu benar-benar mulai dari nol, jangan loncat dulu ke rumus. Mulai dari mindset, pahami area kerja Excel, lalu belajar membuat tabel yang rapi.</p>
              <div className="mt-5 space-y-3">{publishedArticles.slice(0, 3).map((article) => <Link className="block rounded-xl border border-[#1E3022] bg-[#0D1610] p-3 hover:border-[#254A2A]" key={article.slug} to={ROUTES.LEARN_DETAIL(article.slug)}><p className="text-sm font-semibold text-[#E8F0EA]">{article.orderIndex}. {article.title}</p><p className="mt-1 text-xs text-[#8BA98F]">{article.estimatedReadTime}</p></Link>)}</div>
            </div>
          </div>

          {isFallback ? <div className="mt-8"><ErrorState message={`Backend artikel belum merespons, halaman memakai data belajar lokal. ${error ?? ''}`} onRetry={reload} /></div> : null}
          {isLoading ? <div className="mt-10"><LoadingState label="Memuat artikel belajar..." /></div> : null}
          {!isLoading && !publishedArticles.length ? <div className="mt-10"><EmptyState message="Belum ada artikel belajar Excel." icon={FileText} /></div> : null}
        </div>
      </section>

      {!isLoading && publishedArticles.length ? <><StartHereSection articles={publishedArticles} /><MindsetSection /><RoadmapSection /><ArticleCategorySection articles={publishedArticles} /><CaseStudySection /><NextLearningSection /></> : null}
    </PublicLayout>
  )
}

function StartHereSection({ articles }: { articles: Article[] }) {
  return <section className="bg-[#0D1610] py-16 lg:py-20" id="mulai-dari-materi-ini"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionHeading eyebrow="Mulai di sini" title="Mulai dari Materi Ini" description="Kalau kamu benar-benar mulai dari nol, jangan loncat dulu ke rumus. Mulai dari tiga materi ini agar cara belajarmu lebih terarah." /><div className="mt-8 grid gap-5 md:grid-cols-3">{articles.slice(0, 3).map((article) => <ArticleCard article={article} key={article.slug} />)}</div></div></section>
}

function MindsetSection() {
  const points = ['Excel bukan sekadar rumus, tapi cara menyusun data.', 'Tabel yang rapi membuat rumus lebih mudah digunakan.', 'Studi kasus kerja membantu kamu memahami fungsi Excel secara nyata.']
  return <section className="py-16 lg:py-20"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]"><div><Brain className="h-10 w-10 text-green-400" /><h2 className="mt-5 font-heading text-3xl font-bold leading-tight text-[#E8F0EA] sm:text-4xl">Sebelum Menghafal Rumus, Pahami Cara Berpikir Excel Dulu</h2></div><div><p className="text-base leading-8 text-[#8BA98F]">Banyak orang gagal belajar Excel karena langsung menghafal rumus tanpa memahami cara Excel membaca data. Di BisaExcel, kamu akan belajar dari cara berpikirnya terlebih dahulu: bagaimana data disusun, bagaimana tabel dibuat, bagaimana rumus bekerja, dan bagaimana hasil akhirnya bisa dipakai untuk pekerjaan nyata.</p><div className="mt-6 grid gap-3">{points.map((point, index) => <div className="flex gap-3 rounded-xl border border-[#1E3022] bg-[#111E14] p-4" key={point}><span className="font-mono text-sm font-bold text-green-400">{index + 1}</span><p className="text-sm font-semibold text-[#E8F0EA]">{point}</p></div>)}</div></div></div></section>
}

function RoadmapSection() {
  return <section className="bg-[#0D1610] py-16 lg:py-20" id="roadmap-belajar"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionHeading eyebrow="Roadmap" title="Alur Belajar Excel dari Nol" description="Roadmap ini dibuat padat supaya kamu tahu urutannya, bukan untuk membuat kamu terburu-buru." /><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">{learningRoadmap.map((step, index) => <div className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card" key={`${step.title}-${index}`}><span className="font-display text-3xl font-bold text-green-400">{index + 1}</span><h3 className="mt-4 font-heading text-lg font-bold text-[#E8F0EA]">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#8BA98F]">{step.description}</p><span className="mt-4 inline-flex rounded-full border border-[#254A2A] px-2.5 py-1 text-xs font-semibold text-green-300">{step.level}</span><Button asChild className="mt-5 w-full" variant="outline"><Link to={ROUTES.LEARN_DETAIL(step.slug)}>Baca Materi</Link></Button></div>)}</div></div></section>
}

function ArticleCategorySection({ articles }: { articles: Article[] }) {
  return <section className="py-16 lg:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionHeading eyebrow="Materi" title="Artikel Berdasarkan Kategori" description="Pilih materi berdasarkan kebutuhan belajar: mindset, dasar Excel, tabel, rumus, logika, dan studi kasus kerja." /><div className="mt-10 space-y-10">{articleCategories.map((category) => { const items = articles.filter((article) => article.category === category); if (!items.length) return null; return <div key={category}><h3 className="font-heading text-2xl font-bold text-[#E8F0EA]">{category}</h3><div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{items.map((article) => <ArticleCard article={article} key={article.slug} />)}</div></div> })}</div></div></section>
}

function ArticleCard({ article }: { article: Article }) {
  return <Link className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-6 shadow-card transition-all hover:-translate-y-1 hover:border-[#254A2A] hover:bg-[#162419]" to={ROUTES.LEARN_DETAIL(article.slug)}><FileText className="h-7 w-7 text-green-400" /><div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-[#8BA98F]"><span className="rounded-full border border-[#254A2A] px-2.5 py-1">{article.category}</span><span className="rounded-full border border-[#254A2A] px-2.5 py-1">{article.level}</span><span className="inline-flex items-center gap-1 rounded-full border border-[#254A2A] px-2.5 py-1"><Clock className="h-3 w-3" />{article.estimatedReadTime}</span></div><h4 className="mt-4 font-heading text-xl font-bold text-[#E8F0EA]">{article.title}</h4><p className="mt-2 text-sm leading-6 text-[#8BA98F]">{article.excerpt}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-green-400">Baca Materi <ArrowRight className="h-4 w-4" /></span></Link>
}

function CaseStudySection() {
  return <section className="bg-[#0D1610] py-16 lg:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionHeading eyebrow="Studi kasus" title="Belajar Excel Lewat Studi Kasus, Bukan Teori Saja" description="Studi kasus membuat konsep yang kamu baca terasa lebih dekat dengan pekerjaan nyata." /><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{workCaseStudies.map((item) => <Link className="rounded-2xl border border-[#1E3022] bg-[#111E14] p-5 shadow-card hover:border-[#254A2A] hover:bg-[#162419]" key={item.title} to={item.to}><BriefcaseBusiness className="h-7 w-7 text-green-400" /><h3 className="mt-4 font-heading text-lg font-bold text-[#E8F0EA]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#8BA98F]">{item.benefit}</p><div className="mt-4 flex flex-wrap gap-2">{item.skills.map((skill) => <span className="rounded-full border border-[#254A2A] px-2 py-1 text-xs text-green-300" key={skill}>{skill}</span>)}</div></Link>)}</div></div></section>
}

function NextLearningSection() {
  const items = [{ title: 'Tonton Video Bersilabus', icon: PlayCircle, to: ROUTES.VIDEO }, { title: 'Coba Test Excel', icon: Target, to: ROUTES.TEST_EXCEL }, { title: 'Kerjakan Challenge Praktik', icon: ListChecks, to: ROUTES.CHALLENGE }]
  return <section className="py-12"><div className="mx-auto max-w-5xl px-4 text-center sm:px-6"><p className="text-sm leading-6 text-[#8BA98F]">Setelah beberapa materi dasar terasa cukup jelas, kamu bisa lanjut ke video, Test Excel, atau challenge. Bagian ini hanya pilihan lanjutan; fokus utamanya tetap memahami materi dulu.</p><div className="mt-5 flex flex-wrap justify-center gap-3">{items.map((item) => { const Icon = item.icon; return <Link className="inline-flex items-center gap-2 rounded-full border border-[#254A2A] px-4 py-2 text-sm font-semibold text-green-300 hover:bg-[#111E14]" key={item.title} to={item.to}><Icon className="h-4 w-4" />{item.title}</Link> })}</div></div></section>
}

export function ArticleDetailPage() {
  const { slug = '' } = useParams()
  const loadArticle = useCallback(() => articlesService.getBySlugResult(slug), [slug])
  const loadArticles = useCallback(() => articlesService.getAllResult(), [])
  const { data: article, isLoading, isFallback, error, reload } = useAsyncData(loadArticle, [slug])
  const { data: articles } = useAsyncData(loadArticles)
  const orderedArticles = useMemo(() => [...(articles ?? [])].sort((a, b) => a.orderIndex - b.orderIndex), [articles])
  const currentIndex = orderedArticles.findIndex((item) => item.slug === slug)
  const previousArticle = currentIndex > 0 ? orderedArticles[currentIndex - 1] : undefined
  const nextArticle = currentIndex >= 0 && currentIndex < orderedArticles.length - 1 ? orderedArticles[currentIndex + 1] : undefined

  return (
    <PublicLayout>
      <PageMeta title={article?.title ?? 'Materi Excel'} />
      <section className="hero-grid pt-28 sm:pt-32">
        <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-green-400 hover:text-green-300" to={ROUTES.LEARN}><ArrowLeft className="h-4 w-4" />Kembali ke daftar materi</Link>
          {isFallback ? <div className="mt-6"><ErrorState message={`Backend artikel belum merespons, detail memakai data belajar lokal. ${error ?? ''}`} onRetry={reload} /></div> : null}
          {isLoading ? <div className="mt-6"><LoadingState label="Memuat detail artikel..." /></div> : null}
          {!isLoading && !article ? <div className="mt-6"><EmptyState message="Artikel tidak ditemukan." icon={FileText} /></div> : null}
          {!isLoading && article ? <ArticleReader article={article} previousArticle={previousArticle} nextArticle={nextArticle} /> : null}
        </div>
      </section>
    </PublicLayout>
  )
}

function ArticleReader({ article, previousArticle, nextArticle }: { article: Article; previousArticle?: Article; nextArticle?: Article }) {
  return <article className="mt-6 rounded-2xl border border-[#254A2A] bg-[#111E14] p-6 shadow-card sm:p-8"><div className="flex flex-wrap gap-2 text-xs font-semibold text-[#8BA98F]"><span className="rounded-full border border-[#254A2A] px-3 py-1">Materi ke-{article.orderIndex}</span><span className="rounded-full border border-[#254A2A] px-3 py-1">{article.category}</span><span className="rounded-full border border-[#254A2A] px-3 py-1">{article.level}</span><span className="inline-flex items-center gap-1 rounded-full border border-[#254A2A] px-3 py-1"><Clock className="h-3 w-3" />{article.estimatedReadTime}</span></div><h1 className="mt-5 font-display text-4xl font-bold leading-tight text-[#E8F0EA]">{article.title}</h1><p className="mt-4 text-base leading-8 text-[#8BA98F]">{article.excerpt}</p><ReaderIntro article={article} /><LearningGoals article={article} /><ReaderSections article={article} /><CaseStudyBox article={article} /><MistakesBox article={article} /><ReflectionBox article={article} /><SummaryBox article={article} /><ArticleNavigation previousArticle={previousArticle} nextArticle={nextArticle} /></article>
}

function ReaderIntro({ article }: { article: Article }) {
  return <section className="mt-10 border-t border-[#1E3022] pt-8"><h2 className="font-heading text-2xl font-bold text-[#E8F0EA]">Mulai dari sini dulu</h2><div className="mt-4 space-y-4 text-base leading-8 text-[#8BA98F]">{article.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
}

function LearningGoals({ article }: { article: Article }) {
  return <section className="mt-8 rounded-xl border border-[#1E3022] bg-[#0D1610] p-5"><h2 className="font-heading text-xl font-bold text-[#E8F0EA]">Setelah membaca materi ini, kamu akan memahami:</h2><div className="mt-4 grid gap-3">{article.learningGoals.map((goal) => <div className="flex gap-3 text-sm text-[#8BA98F]" key={goal}><CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" /><span>{goal}</span></div>)}</div></section>
}

function ReaderSections({ article }: { article: Article }) {
  return <section className="mt-10 space-y-9">{article.sections.map((section, index) => <div key={section.title}><h2 className="font-heading text-2xl font-bold text-[#E8F0EA]">{index + 1}. {section.title}</h2><div className="mt-3 space-y-4 text-base leading-8 text-[#8BA98F]">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>)}</section>
}

function CaseStudyBox({ article }: { article: Article }) {
  if (!article.caseStudy) return null
  return <section className="mt-10 rounded-xl border border-green-700/40 bg-green-950/25 p-5"><BookOpen className="h-7 w-7 text-green-400" /><h2 className="mt-4 font-heading text-xl font-bold text-[#E8F0EA]">Contoh kecil di dunia kerja</h2><p className="mt-2 text-sm leading-7 text-[#8BA98F]">{article.caseStudy.description}</p><div className="mt-4 flex flex-wrap gap-2">{article.caseStudy.skills.map((skill) => <span className="rounded-full border border-[#254A2A] bg-[#0D1610] px-2.5 py-1 text-xs text-green-300" key={skill}>{skill}</span>)}</div></section>
}

function MistakesBox({ article }: { article: Article }) {
  return <section className="mt-8 rounded-xl border border-[#1E3022] bg-[#0D1610] p-5"><h2 className="font-heading text-xl font-bold text-[#E8F0EA]">Kesalahan yang sering dilakukan pemula</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-[#8BA98F]">{article.commonMistakes.map((mistake) => <li className="flex gap-3" key={mistake}><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />{mistake}</li>)}</ul></section>
}

function ReflectionBox({ article }: { article: Article }) {
  if (!article.reflectionPrompt) return null
  return <section className="mt-8 rounded-xl border border-[#254A2A] bg-[#0F1A12] p-5"><h2 className="font-heading text-xl font-bold text-[#E8F0EA]">Coba pikirkan sebentar</h2><p className="mt-3 text-sm leading-7 text-[#8BA98F]">{article.reflectionPrompt}</p></section>
}

function SummaryBox({ article }: { article: Article }) {
  return <section className="mt-8 rounded-xl border border-[#1E3022] bg-[#0D1610] p-5"><h2 className="font-heading text-xl font-bold text-[#E8F0EA]">Yang perlu kamu ingat</h2><div className="mt-4 grid gap-3">{article.summary.map((item) => <div className="flex gap-3 text-sm leading-6 text-[#8BA98F]" key={item}><CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />{item}</div>)}</div><p className="mt-5 text-xs leading-6 text-[#8BA98F]">Setelah menyelesaikan beberapa materi dasar, kamu bisa lanjut menonton video atau mencoba Test Excel untuk mengukur pemahamanmu. <Link className="text-green-400 hover:text-green-300" to={ROUTES.VIDEO}>Lihat video pembelajaran</Link> · <Link className="text-green-400 hover:text-green-300" to={ROUTES.TEST_EXCEL}>Coba Test Excel</Link></p></section>
}

function ArticleNavigation({ previousArticle, nextArticle }: { previousArticle?: Article; nextArticle?: Article }) {
  return <nav className="mt-8 border-t border-[#1E3022] pt-6"><div className="grid gap-3 sm:grid-cols-2">{previousArticle ? <Button asChild variant="outline"><Link to={ROUTES.LEARN_DETAIL(previousArticle.slug)}><ArrowLeft className="h-4 w-4" />Materi Sebelumnya</Link></Button> : <Button disabled variant="outline"><ArrowLeft className="h-4 w-4" />Materi Sebelumnya</Button>}{nextArticle ? <Button asChild><Link to={ROUTES.LEARN_DETAIL(nextArticle.slug)}>Materi Berikutnya<ArrowRight className="h-4 w-4" /></Link></Button> : <Button disabled>Materi Berikutnya<ArrowRight className="h-4 w-4" /></Button>}</div><Link className="mt-5 inline-flex text-sm font-semibold text-green-400 hover:text-green-300" to={ROUTES.LEARN}>Kembali ke daftar materi</Link></nav>
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">{eyebrow}</p><h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-[#E8F0EA] sm:text-4xl">{title}</h2><p className="mt-3 text-sm leading-7 text-[#8BA98F] sm:text-base">{description}</p></div>
}