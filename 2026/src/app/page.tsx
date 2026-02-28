import PageTopLink from "@/components/PageTopLink";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <h2>このサイトについて🌸</h2>
      <div className="text">
          <p className="p-lined">
            <b>さくちゃん、お誕生日おめでとう！🎂🎊💐</b>
            <br />
            このサイトは、さくちゃんの魅力をみんなに伝えたい、そして素敵なお祝いイラストやメッセージを一挙に閲覧できる場所を作りたい…そんな思いから、ファンの有志が集まって制作した非公式ファンサイトです。
            <br />
            大好きなさくちゃんへ送る「おめでとう」の気持ちを、時間が経ってもいつでも見返すことができる場所として残していけたら――そんな願いも込められています。
            <br />
            いつも笑顔でみんなを幸せにしてくれてありがとう♡素敵な1年になりますように！
            <br />
            <br />
            英文セクションも、海外ファンのご協力により制作されています。
            それぞれの言葉で紡がれた想いも、あわせて楽しんでいただけたら嬉しいです🌸
            <br />
            <br />
            ※掲載されているメッセージ・イラストは投稿者様のご厚意により掲載しています。無断転載・無断使用・AI学習への利用はご遠慮ください。
          </p>
          
          <div className="lang-divider">
          <span>❄🌸🎧</span>
          </div>

          <p className="p-lined-en">
            <b>Happy Birthday, Saku-chan!🎂🎊💐</b>
            <br />
            This site was created by a group of fans who came together to share Saku-chan’s charm with everyone and create a place where people can enjoy all the wonderful celebratory illustrations and messages!
            <br />
            Thank you for always bringing happiness to everyone with your smile ♡ We hope you have a wonderful year ahead!
            <br />
            <br />
            ※This is an unofficial fan website.<br />
            All messages, illustrations, and photographs are shared with the generous permission of their respective creators.<br />
            Reproducing, redistributing, or using the content for AI training purposes is prohibited without authorization.<br />
          </p>
      </div>
      <PageTopLink />

      <h2 id="about-saku">碧依さくらちゃんについて🌸</h2>
      <div className="text">
      <h3>❄️ プロフィール</h3>
          <p className="p-lined">
            デビュー日：2024年2月4日<br />
            誕生日：3月27日<br />
            身長：153cm<br />
            ファンマーク：❄️🌸🎧<br />
            所属：re;BON（ファウンダー）<br />
            好きなこと：歌うこと、ゲームをすること、楽しいこと<br />
            好きなゲーム：FPS、マイクラ、スマホゲーム<br />
            好きな食べ物：グラタン、ハンバーグ、寿司、焼肉
          </p>

      <h3>🌸 紹介文</h3>
          <p className="p-lined">
            2024年2月4日にデビューした、歌うこととファンのことが本当に大好きな女の子。<br />
            桜の妖精と雪女のハーフで、透き通る歌声とまっすぐな想いを届けている。<br /><br />
            2026年3月27日は、彼女が活動を始めてから2度目の誕生日。<br />
            ソロ配信ではリスナーとのやりとりを大切にし、コラボ配信では軽やかな掛け合いで場を明るくしている。
            歌枠では一音一音に気持ちを込め、ライブでは全身全霊で想いを伝える。
            『Apex Legends』でレイスを愛し続け、ASGSという大会を主催する行動力もあわせ持つ。
            可愛い一面と、挑戦を恐れない強さ。そのどちらも大切にしているところが、彼女らしさ。<br /><br />
            年に数回開催されるオフラインイベントやライブでは、その場に足を運んだ人だけが味わえる特別な時間が生まれる。
            アンコールや演出のひとつひとつに込められた想いから、これでもかというほどのファンへの愛が伝わってくる。
            過去も現在も大切にしながら、できるかぎり言葉にして届けようとするまっすぐさも、彼女の魅力のひとつ。<br /><br />
            配信後の感想やファンアートにも目を通し、ひとりひとりの存在をきちんと覚えているところからも、ファンを大切にしている気持ちが伝わってくる。<br /><br />
            彼女が届けてくれる歌と想いが、これからもたくさんの人の心に咲き続けますように。<br />
          </p>

      <h3>🩵 主なリンク</h3>
            <div className="p-lined">
              <div className="official-links">
                <a href="https://x.com/sakura_aoi_main" target="_blank" rel="noopener noreferrer">
                  <FaXTwitter className="icon" />
                  Twitter
                </a>
                <span className="sep" aria-hidden="true" />

                <a href="https://www.youtube.com/channel/UCAVdcteEwgNrEBW7Aj9pZSw" target="_blank" rel="noopener noreferrer">
                  <FaYoutube className="icon" />
                  YouTube
                </a>
                <span className="sep" aria-hidden="true" />

                <a href="https://www.twitch.tv/aoi_sakura3" target="_blank" rel="noopener noreferrer">
                  <FaTwitch className="icon" />
                  Twitch
                </a>
                <span className="sep" aria-hidden="true" />

                <a href="https://aoi-sakura3.booth.pm/" target="_blank" rel="noopener noreferrer">BOOTH</a>
                <span className="sep" aria-hidden="true" />

                <a href="https://aoisakura.fanbox.cc/" target="_blank" rel="noopener noreferrer">FANBOX</a>
                <span className="sep" aria-hidden="true" />

                <a href="https://twitcasting.tv/sakura_aoi_main" target="_blank" rel="noopener noreferrer">TwitCasting</a>
                <span className="sep" aria-hidden="true" />

                <a href="https://www.instagram.com/aoi_sakura.3" target="_blank" rel="noopener noreferrer">Instagram</a>
                <span className="sep" aria-hidden="true" />

                <a href="https://rebon-corp.com/" target="_blank" rel="noopener noreferrer">re;BON</a>
              </div>
            </div>
      </div>
      <PageTopLink />

      
      <h2 id="about-saku">About Aoi Sakura</h2>
      <div className="text">
      <h3>🌸 Profile</h3>
          <p className="p-lined-en">
            Debut Date: February 4, 2024<br />
            Birthday: March 27<br />
            Height: 153cm<br />
            Fan Mark: ❄️🌸🎧<br />
            Affiliation: re;BON (Founder)<br />
            Favorite Things: Singing, Gaming, Fun Activities<br />
            Favorite Games: FPS, Minecraft, Mobile Games<br />
            Favorite Foods: Gratin, Hamburg Steak, Sushi, Yakiniku
          </p>

      <h3>🌸 Introduction</h3>
          <p className="p-lined-en">
            Born from a cherry blossom fairy and a yuki-onna, Aoi Sakura is like the moment when spring and winter briefly meet.
            Blooming between seasons, she carries both the sweetness of drifting petals and the joy of new beginnings, while also embodying the gentle comfort of winter, like shared warmth beneath falling snow.<br />
            Like petals settling on fresh snow, her soft and tender voice makes every moment spent with her feel alive.
            With her bright and contagious laughter, she will lift your heart before you even realize it.
            Whether she’s singing her heart out, throwing herself into video games, or sharing playful banter, she draws people close with sincere enthusiasm, making time spent with her into something unforgettable.
          </p>

      <h3>🩵 Official Links</h3>
      <div className="p-lined">
      <div className="official-links">
        <a href="..."><FaXTwitter className="icon" />Twitter</a>
        <span className="sep" aria-hidden="true"></span>

        <a href="http://www.youtube.com/@aoi_sakura3"><FaYoutube className="icon" />YouTube</a>
        <span className="sep" aria-hidden="true"></span>

        <a href="..."><FaTwitch className="icon" />Twitch</a>
        <span className="sep" aria-hidden="true"></span>

        <a href="...">BOOTH</a>
        <span className="sep" aria-hidden="true"></span>

        <a href="...">FANBOX</a>
        <span className="sep" aria-hidden="true"></span>

        <a href="...">TwitCasting</a>
        <span className="sep" aria-hidden="true"></span>

        <a href="...">Instagram</a>
        <span className="sep" aria-hidden="true"></span>

        <a href="...">re;BON</a>
      </div>
      </div>


      </div>
      <PageTopLink />
    </>
  );
}