const GAME_TITLE = "Turtles in Time - Visible Timer";
const GAME_REPO_URL = "https://github.com/enkorsan/TurtlesInTime-VisibleTimer";

const ROMSETS = [
  {
    id: "tmht22pe",
    label: "tmht22pe (2P, ver. EBA - Europe)",
    files: [
      {
        id: "02",
        label: "063eba02.8e",
        file: "063eba02.8e",
        patch: "patches/tmht22pe/063eba02.8e.ips",
        before: { size: 131072, sha1: "18059da85c59eb6ce193111bb8c7bd6601b1e698", crc32: "99409094" },
        after:  { size: 131072, sha1: "fe7b263ef74f742b7ae606837a8a8603d25ef227", crc32: "BE07A4C1" }
      },
      {
        id: "03",
        label: "063eba03.8g",
        file: "063eba03.8g",
        patch: "patches/tmht22pe/063eba03.8g.ips",
        before: { size: 131072, sha1: "95c03b215f1db8377b2f6b4686055fcf0117f878", crc32: "4D65650F" },
        after:  { size: 131072, sha1: "33bb32ef5a2c81af9ae8d0235c0bbdec716b0a21", crc32: "A5191E20" }
      },
      {
        id: "04",
        label: "063eba04.10e",
        file: "063eba04.10e",
        patch: "patches/tmht22pe/063eba04.10e.ips",
        before: { size: 131072, sha1: "1ad5cb30ad3ef6e2cd954c3e2f1b6775cbf7a676", crc32: "F6E3B9C7" },
        after:  { size: 131072, sha1: "ef17a8e441344b5161ce8ab88f6dda6c6aa904c9", crc32: "36B664F6" }
      },
      {
        id: "05",
        label: "063eba05.10g",
        file: "063eba05.10g",
        patch: "patches/tmht22pe/063eba05.10g.ips",
        before: { size: 131072, sha1: "8da436bce4cafd9e09e5272f0c1c37395c26ac02", crc32: "1BAD6696" },
        after:  { size: 131072, sha1: "0d319d8ff811c2337e75d5d9ab58e630f895951f", crc32: "5DFED6A0" }
      }
    ]
  },
  {
    id: "tmnt22pu",
    label: "tmnt22pu (2P, ver. UDA - USA)",
    files: [
      {
        id: "02",
        label: "063uda02.8e",
        file: "063uda02.8e",
        patch: "patches/tmnt22pu/063uda02.8e.ips",
        before: { size: 131072, sha1: "f20eaef64f81b91726675006aa45807b0841f046", crc32: "AADFFE3A" },
        after:  { size: 131072, sha1: "d6b01931b7525e8b45e3c9e089c0a20e95912458", crc32: "DB9D58AD" }
      },
      {
        id: "03",
        label: "063uda03.8g",
        file: "063uda03.8g",
        patch: "patches/tmnt22pu/063uda03.8g.ips",
        before: { size: 131072, sha1: "ab8eb954a56cbb18a26af3431aa8d60406ef23b5", crc32: "125687A8" },
        after:  { size: 131072, sha1: "0b928aa1309a642b6bd7525b31a3af5321380b2b", crc32: "613FCD46" }
      },
      {
        id: "04",
        label: "063uda04.10e",
        file: "063uda04.10e",
        patch: "patches/tmnt22pu/063uda04.10e.ips",
        before: { size: 131072, sha1: "322ec2a4a6a2ecea0865bc72b6c1d23e52da33da", crc32: "FB5C7DED" },
        after:  { size: 131072, sha1: "d7722027c34ab8cf3b157c38e6748c1d9007e931", crc32: "D71444E5" }
      },
      {
        id: "05",
        label: "063uda05.10g",
        file: "063uda05.10g",
        patch: "patches/tmnt22pu/063uda05.10g.ips",
        before: { size: 131072, sha1: "d2d1f24bf8ab44d24478f021f0b651095f623860", crc32: "3C40FE66" },
        after:  { size: 131072, sha1: "605c17051ccdf9ea9f208d1032fe3a72250e6074", crc32: "F8C3A403" }
      }
    ]
  }
];
