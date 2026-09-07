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
        after:  { size: 131072, sha1: "38477e2d5d490297931d3187f48ad9b57e6cea32", crc32: "F0A125A8" }
      },
      {
        id: "03",
        label: "063eba03.8g",
        file: "063eba03.8g",
        patch: "patches/tmht22pe/063eba03.8g.ips",
        before: { size: 131072, sha1: "95c03b215f1db8377b2f6b4686055fcf0117f878", crc32: "4D65650F" },
        after:  { size: 131072, sha1: "2a3a3bf0aca8d7fb5bf0613980b199c3f527751a", crc32: "D5D1A3BD" }
      },
      {
        id: "04",
        label: "063eba04.10e",
        file: "063eba04.10e",
        patch: "patches/tmht22pe/063eba04.10e.ips",
        before: { size: 131072, sha1: "1ad5cb30ad3ef6e2cd954c3e2f1b6775cbf7a676", crc32: "F6E3B9C7" },
        after:  { size: 131072, sha1: "2c710666c7da91c4a71b6c349891a2fde06fe57f", crc32: "4F8E9F9E" }
      },
      {
        id: "05",
        label: "063eba05.10g",
        file: "063eba05.10g",
        patch: "patches/tmht22pe/063eba05.10g.ips",
        before: { size: 131072, sha1: "8da436bce4cafd9e09e5272f0c1c37395c26ac02", crc32: "1BAD6696" },
        after:  { size: 131072, sha1: "920d802d879b3fff736a8c04c4025951c2171a39", crc32: "C797B0AB" }
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
        after:  { size: 131072, sha1: "1f3a976096ca22bb2f5661e1a66a464d23914020", crc32: "F417381E" }
      },
      {
        id: "03",
        label: "063uda03.8g",
        file: "063uda03.8g",
        patch: "patches/tmnt22pu/063uda03.8g.ips",
        before: { size: 131072, sha1: "ab8eb954a56cbb18a26af3431aa8d60406ef23b5", crc32: "125687A8" },
        after:  { size: 131072, sha1: "b6053c5c0c63960c205ab7f128cf61305f4a7b8f", crc32: "343C02D5" }
      },
      {
        id: "04",
        label: "063uda04.10e",
        file: "063uda04.10e",
        patch: "patches/tmnt22pu/063uda04.10e.ips",
        before: { size: 131072, sha1: "322ec2a4a6a2ecea0865bc72b6c1d23e52da33da", crc32: "FB5C7DED" },
        after:  { size: 131072, sha1: "3d1c5305b079470c382ea3240efa929942e8a098", crc32: "DFFF3864" }
      },
      {
        id: "05",
        label: "063uda05.10g",
        file: "063uda05.10g",
        patch: "patches/tmnt22pu/063uda05.10g.ips",
        before: { size: 131072, sha1: "d2d1f24bf8ab44d24478f021f0b651095f623860", crc32: "3C40FE66" },
        after:  { size: 131072, sha1: "6ea1dc596454fa4b6de32b655bb2c4e2b7e6ef31", crc32: "0445007F" }
      }
    ]
  }
];
