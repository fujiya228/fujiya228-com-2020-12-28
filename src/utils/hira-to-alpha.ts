// https://future-architect.github.io/typescript-guide/typing.html#id6
const kanaMap: Record<string, string> = {
  // ひらがな
  あ: 'a',
  い: 'i',
  う: 'u',
  え: 'e',
  お: 'o',
  か: 'ka',
  き: 'ki',
  く: 'ku',
  け: 'ke',
  こ: 'ko',
  さ: 'sa',
  し: 'shi',
  す: 'su',
  せ: 'se',
  そ: 'so',
  た: 'ta',
  ち: 'chi',
  つ: 'tsu',
  て: 'te',
  と: 'to',
  な: 'na',
  に: 'ni',
  ぬ: 'nu',
  ね: 'ne',
  の: 'no',
  は: 'ha',
  ひ: 'hi',
  ふ: 'hu',
  へ: 'he',
  ほ: 'ho',
  ま: 'ma',
  み: 'mi',
  む: 'mu',
  め: 'me',
  も: 'mo',
  や: 'ya',
  ゆ: 'yu',
  よ: 'yo',
  ら: 'ra',
  り: 'ri',
  る: 'ru',
  れ: 're',
  ろ: 'ro',
  わ: 'wa',
  を: 'wo',
  ん: 'nn',
  が: 'ga',
  ぎ: 'gi',
  ぐ: 'gu',
  げ: 'ge',
  ご: 'go',
  ざ: 'za',
  じ: 'ji',
  ず: 'zu',
  ぜ: 'ze',
  ぞ: 'zo',
  だ: 'da',
  ぢ: 'di',
  づ: 'du',
  で: 'de',
  ど: 'do',
  ば: 'ba',
  び: 'bi',
  ぶ: 'bu',
  べ: 'be',
  ぼ: 'bo',
  ぱ: 'pa',
  ぴ: 'pi',
  ぷ: 'pu',
  ぺ: 'pe',
  ぽ: 'po',
  きゃ: 'kya',
  きゅ: 'kyu',
  きょ: 'kyo',
  しゃ: 'sha',
  しゅ: 'shu',
  しょ: 'sho',
  ちゃ: 'cha',
  ちゅ: 'chu',
  ちょ: 'cho',
  にゃ: 'nya',
  にゅ: 'nyu',
  にょ: 'nyo',
  ひゃ: 'hya',
  ひゅ: 'hyu',
  ひょ: 'hyo',
  みゃ: 'mya',
  みゅ: 'myu',
  みょ: 'myo',
  りゃ: 'rya',
  りゅ: 'ryu',
  りょ: 'ryo',
  ぎゃ: 'gya',
  ぎゅ: 'gyu',
  ぎょ: 'gyo',
  じゃ: 'ja',
  じゅ: 'ju',
  じょ: 'jo',
  びゃ: 'bya',
  びゅ: 'byu',
  びょ: 'byo',
  ぴゃ: 'pya',
  ぴゅ: 'pyu',
  ぴょ: 'pyo',
  しぇ: 'shie',
  ちぇ: 'chie',
  てぃ: 'tei',
  にぃ: 'nii',
  にぇ: 'nie',
  ふぁ: 'fua',
  ふぃ: 'fui',
  ふぇ: 'fue',
  ふぉ: 'fuo',
  じぇ: 'jie',
  でぃ: 'dei',
  でゅ: 'deyu',
  うぃ: 'ui',
  うぇ: 'ue',
  うぉ: 'up',
  // カタカナ
  ア: 'a',
  イ: 'i',
  ウ: 'u',
  エ: 'e',
  オ: 'o',
  カ: 'ka',
  キ: 'ki',
  ク: 'ku',
  ケ: 'ke',
  コ: 'ko',
  サ: 'sa',
  シ: 'shi',
  ス: 'su',
  セ: 'se',
  ソ: 'so',
  タ: 'ta',
  チ: 'chi',
  ツ: 'tsu',
  テ: 'te',
  ト: 'to',
  ナ: 'na',
  ニ: 'ni',
  ヌ: 'nu',
  ネ: 'ne',
  ノ: 'no',
  ハ: 'ha',
  ヒ: 'hi',
  フ: 'hu',
  ヘ: 'he',
  ホ: 'ho',
  マ: 'ma',
  ミ: 'mi',
  ム: 'mu',
  メ: 'me',
  モ: 'mo',
  ヤ: 'ya',
  ユ: 'yu',
  ヨ: 'yo',
  ラ: 'ra',
  リ: 'ri',
  ル: 'ru',
  レ: 're',
  ロ: 'ro',
  ワ: 'wa',
  ヰ: 'i',
  ヱ: 'e',
  ヲ: 'wo',
  ン: 'nn',
  ガ: 'ga',
  ギ: 'gi',
  グ: 'gu',
  ゲ: 'ge',
  ゴ: 'go',
  ザ: 'za',
  ジ: 'ji',
  ズ: 'zu',
  ゼ: 'ze',
  ゾ: 'zo',
  ダ: 'da',
  ヂ: 'di',
  ヅ: 'du',
  デ: 'de',
  ド: 'do',
  バ: 'ba',
  ビ: 'bi',
  ブ: 'bu',
  ベ: 'be',
  ボ: 'bo',
  パ: 'pa',
  ピ: 'pi',
  プ: 'pu',
  ペ: 'pe',
  ポ: 'po',
  キャ: 'kya',
  キュ: 'kyu',
  キョ: 'kyo',
  シャ: 'sha',
  シュ: 'shu',
  ショ: 'sho',
  チャ: 'cha',
  チュ: 'chu',
  チョ: 'cho',
  ヒャ: 'hya',
  ヒュ: 'hyu',
  ヒョ: 'hyo',
  ミャ: 'mya',
  ミュ: 'myu',
  ミョ: 'myo',
  リャ: 'rya',
  リュ: 'ryu',
  リョ: 'ryo',
  ギャ: 'gya',
  ギュ: 'gyu',
  ギョ: 'gyo',
  ジャ: 'ja',
  ジュ: 'ju',
  ジョ: 'jo',
  ビャ: 'bya',
  ビュ: 'byu',
  ビョ: 'byo',
  ピャ: 'pya',
  ピュ: 'pyu',
  ピョ: 'pyo',
  シェ: 'shie',
  チェ: 'chie',
  ティ: 'tei',
  ニィ: 'nii',
  ニェ: 'nie',
  ファ: 'fua',
  フィ: 'fui',
  フェ: 'fue',
  フォ: 'fuo',
  ジェ: 'jie',
  ディ: 'dei',
  デュ: 'deyu',
  ウィ: 'ui',
  ウェ: 'ue',
  ウォ: 'up',
  ヴァ: 'bua',
  ヴィ: 'bi',
  ヴ: 'bu',
  ヴェ: 'be',
  ヴォ: 'bo',
  // space
  '　': ' ',
  ' ': ' ',
};

const smallKanaMap: string[] = [
  'ゃ', 'ゅ', 'ょ', 'ぁ', 'ぃ', 'ぇ', 'ぉ', 'ャ', 'ュ', 'ョ', 'ァ', 'ィ', 'ェ', 'ォ',
];
const isAlpha = new RegExp(/^[A-Za-z]/);
export const abbreviation = (string: string): string[] => {
  const stringList: string[] = [];
  let alpha = '';
  Array.prototype.forEach.call(string, (item: string, index: number) => {
    if (smallKanaMap.includes(item)) {
      stringList[index - 1] += item;
    } else {
      stringList.push(item);
    }
  });
  stringList.forEach(item => {
    if (isAlpha.exec(item)) {
      alpha += item;
    } else {
      alpha += kanaMap[item] === undefined ? '?' : kanaMap[item];
    }
  });
  if (alpha.length < 3) {
    return [alpha, alpha];
  }

  return [alpha, alpha[0] + (alpha.length - 2).toString() + alpha[alpha.length - 1]];
};
