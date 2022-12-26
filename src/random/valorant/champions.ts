// https://namu.wiki/w/발로란트/요원

export type positiontype = "타격대" | "척후대" | "감시자" | "전략가";

export const positions: {
  [key: string]: string;
} = {
  "타격대": "https://w.namu.la/s/c5f72e9b4cb6035bc12f90d586980100a6548549ce6a37d58d17e3eb6e404cc0e9cd207438d55f692a8ea293a9656e456892fe691fae06b21c023dfb5d33471d0e90a4d4b8cc4ae50890360b291725cd1a994d95294d7e04c408640685469810",
  "척후대": "https://w.namu.la/s/4a9c6533e7276af3bf726b0537ad4511bdb4aa91a3b19e24b3a3203e8ba94a6d95bba48cb5f331e90633a2de62caf9f1666ed1287a4f0165ecf024bdf1a43013cc271badf57cde74330762159bbd11ba3e8da208cbf089d74f3ca19d417979fe",
  "감시자": "https://w.namu.la/s/490f9109c202b22e26c7f1df7222d76baab1cf16a7e1bcfb2f30ab000dedbbac2653d5db8b6ca16023167089958b205575f56239f9dbf1337bb0bd21dd1de6f186b21d70bc71ff57a46678eb2195f023e94b580119f41424090af4158f71f32b",
  "전략가": "https://w.namu.la/s/54e23e25e2cc67f12b8778b7a6712d84cf6c318115d283ab9e38df40698c99d2201c266afdf67613848cbad01eeda28face047f6175806cd31011034bb52b06f7333dec40ae9c5f0114df2a7702ed9285ade2b4018682b153488cc4a768c568f"
};

export const champions: {
  [key: string]: {
    id: string;
    name: string;
    image: string;
  }[];
} = {
  "타격대": [
    {
      id: "neon",
      name: "네온",
      image: "https://w.namu.la/s/c32af9826b4eb7000bbdadde6d1bb0238857ce966976014a65a0c2845016ba0b1e8191480c428faf6a2855cb8b5c643bba9d88920648dbee172639b559c2d4531f5f7b06126cb8410ef1a464723360faf6ef5e6386b60aafb16373bbb4c4eed9"
    },
    {
      id: "reyna",
      name: "레이나",
      image: "https://w.namu.la/s/fb53aa1c005e2df4527699df24ddc65ad2f7eb66271bdf8994afab051279139e98b90075b46c99af93bd005dc44d89b8944372a0e5cd435825383ef63d070c6543f5176f3c15d0ff2f5e1e3132ac7280db401df3444084525cd298a28dda1323"
    },
    {
      id: "raze",
      name: "레이즈",
      image: "https://w.namu.la/s/fc1b6d799834492a98738edaa9391cb82c61ccc3cc89b8e12e6d7a9b2702593f8c691527032b19e9e9d5b92e0a105c7c370cb0f4e63745eaa410aa403a02e26ff2a4598617bbc400daacb44088e5054a0bb0934f37b66b9ba8bbd4120e57f2e4"
    },
    {
      id: "yoru",
      name: "요루",
      image: "https://w.namu.la/s/0ac740dc96ae338b195ce0230d4fc29b49e7f2e7eee88126cb83cb0903019f90f755b4216c9d9ef5d09aad5a3e0d8703a69a4a3f8860f349227ebc54fe96c546808be93a3d10baed3169125c0e79785d595dbb91ae0f9fcfd5960f9a705f1f85"
    },
    {
      id: "jett",
      name: "제트",
      image: "https://w.namu.la/s/73fe51f30d510c4d79b35a8ca35ecf6843f9127b454e593185dbf9d4ee7ff8982fc8bf8687030fa10ba3c71f269557f84b25a7bb071b21e2d81a3ce88f9dfaf99cad22881bfd0dc31f9a44a261f7289032a69f5f5903454fe1185cb74340cb93"
    },
    {
      id: "phoenix",
      name: "피닉스",
      image: "https://w.namu.la/s/6c342fdb923bfef15985b7524cf1fa8189965f6bb50911c7eb055f17324c1fea56ea5fd1ea87ad7948043f029d0744392614d2109dc420b809d3dda0ac0222b3a06ade9ec473f772f2a015e15717989dc33a25d11771c167a21f1dccd4b7fc9f"
    }
  ],
  "척후대": [
    {
      id: "breach",
      name: "브리치",
      image: "https://w.namu.la/s/83c10b6882e3669060a6b5fc6e2b6c32439a56bf96c2ba1c2b465cf948dc1854adee483210b70ccb0162e9aaa20956e5dd6abc76832e0a799a4df2efcbcc4bf7af43001e392dcc792effa22a8d92e054acb8daed859b7493cdc437bd2ecf1f82"
    },
    {
      id: "sova",
      name: "소바",
      image: "https://w.namu.la/s/6300c6cb12eef3aa397455d3ffd2a8f0311a224737dd043a1acc272cc2abca4c5ba14a062bda57005d51f2f2f91a8a12fcf0fa8bbaa5aa19b83daed29344d9ddb854f1f5693b103097050776c6c207633913640afc93cdfd6e2826814fe74f47"
    },
    {
      id: "skye",
      name: "스카이",
      image: "https://w.namu.la/s/f107f8250c04d8e3f998b2c28f0471187b7befae2a3cd77c99dcd8f1e7fa879b0d766359782f3d5c2acfa1e3b263a69bbea6f4e1f29e4b94175f6991564584579e7f5deac0f4511640f02fc2af2b091fc945e4fd07e2497d4ae78e5bb9aa2f78"
    },
    {
      id: "kay-o",
      name: "케이/오",
      image: "https://w.namu.la/s/4f2819a79b76e48c2a869ad3bd6d2eb14b99ca8c41f258c794865c48e1059fdadda31824c733b2dde0f2f2b73e73d4ec6eb44b12cfef8784c722464edb780ca605920d545da313cfdaa3cb8570b04efd52092d6787dcd762c863dc5899b1cf5e"
    },
    {
      id: "fade",
      name: "페이드",
      image: "https://w.namu.la/s/33a5eb02016dde7e18db38b447a88983311e3ac3d62bc82ff31a6a1e30e05ada5258135e0cfb371f95e19d3ae8a50cb47e0c1d6a01b30cf8058ced5723c985c2080704975e107130c7abdc37bed9f8921d84cfa6405e6642aaa4f15ae3e80385"
    }
  ],
  "감시자": [
    {
      id: "cypher",
      name: "사이퍼",
      image: "https://w.namu.la/s/744b9e4827e527501e85e9d2b4bab3d0a21ee408690fdfd80cf740cc16b791397041bf3105b4a0ddd184d74149ecfbe5055e448c7876e34dec664713371556f93b243e32c5925e313218b4fd5c5d833ce4ef8644f6424e3ccb674ea1b3f98b7d"
    },
    {
      id: "sage",
      name: "세이지",
      image: "https://w.namu.la/s/0683ca50e094caf03cc906fe71b187fc44e1c6645bb2eb714e141e9cf33fdc6c72cde105422be029ce531eb39a2ae99f8fe7e61113c0f0b342a2507b2c1dd6d812cb9d8b36ca959e0a7bda7f0599d6c56991b42945ee80bd70edd908ef516aaf"
    },
    {
      id: "chamber",
      name: "체임버",
      image: "https://w.namu.la/s/ee878b96fa21ffadff3cddae7f1f796f518e7b8284d46e7106cbfc5978b76dfa4cc69261e3e34da9dd97b6c70618ea65a8d55d70aa664fff4c01265fd1b3459e3383e0d1600a301191163197bb231834e9cf15dfcd03a348608f7af87feada93"
    },
    {
      id: "killjoy",
      name: "킬조이",
      image: "https://w.namu.la/s/411cfd055f23fdf19486564c6343fb52877ce4033415ed1e75746e22ac305506076203ba9204b054f9f812d7cf7d9840456500f0e3fac5462ab4a8da051f59532e419a5ac8b533253242e0465c5789043f04f3591afd193504924fea26247f53"
    }
  ],
  "전략가": [
    {
      id: "fade",
      name: "바이퍼",
      image: "https://w.namu.la/s/4eb7cc1a1ab909a3cbc3291ffd7cfc046535781a81bd5c703499e15633ab0234fd14b4030245e5f2db37b5f15b7f11059800ac0ec38e41ee8883a81d85ea6275d948c147a31b2f865450e6a7e1e3c7eed14cc67926a4d31a1e9f61ce76365398"
    },
    {
      id: "brimstone",
      name: "브림스톤",
      image: "https://w.namu.la/s/042387d382b5ca9b92e65959e2bc3daf76d15bd1833280940a3bea50a724a9ced0548dc47c8d226c28cad499214b5f715194be6c5bd95944f4eb8fb9fd11f860a03ec959916ece05dfd7ef70a9db1689908e66ab7fc417472060f61cee36296e"
    },
    {
      id: "astra",
      name: "아스트라",
      image: "https://w.namu.la/s/6d459eccf88b15e66e99b491c37aa4a7d211ed27402fe717f8ad2c60d912d5e7470f70e3f3ebb0ca53904c5d2eea8aa1880d7de6b1cc62a685083580efcdc58c834abf18b6df1fa49c7415f83e08423116717696c88f1234dca7ec63e6e7757a"
    },
    {
      id: "omen",
      name: "오멘",
      image: "https://w.namu.la/s/c30e900a8350e99d5a26143388692c8b6b5628f6f0c70ab83ced6f86d677d94666ecae1185c59431d252de5e8b1e0fd54cd5274f2ef81481758ce135c1170dbc76bfd94fc1a5aca5cbd343dae5b9cd14c62c057ba661b820b81f6b84f5bfc350"
    },
    {
      id: "harbor",
      name: "하버",
      image: "https://w.namu.la/s/66b4cade6c56e346bf161f52234803d1a4bedff29712361051f188be63bdf4c08a28ecdbaf3c8829dd9e57666aff18b5f7590717eb35d0860a3aad5e0a1eb5026da5107d10c6f8f27869e9845b922d1610db3c63b51b116e45feaf3ca1457b00"
    }
  ]
};