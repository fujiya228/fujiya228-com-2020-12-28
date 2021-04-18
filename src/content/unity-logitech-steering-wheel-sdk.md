---
layout: post
title: 'LogitechSDKのLogitechSteeringWheelを使ってみる-Unity'
author: [Fujiya]
tags: ['LogitechSteeringWheel', 'LogitechSDK','Unity']
category: Unity
image: 'img/taxonomy/unity.png'
date: '2021-02-18T22:29:17.482Z'
draft: false
excerpt: Unity Article
---

[Logitech G29を使うためにLogitechSDKをセットアップ-Unity](https://fujiya228.com/unity-logitech-g29-setup/)で使ったLogitechSDKのLogitechSteeringWheelの関数を詳しく見ていこうと思います。

## 初期化など
全体として必要な関数を紹介します。

### LogiSteeringInitialize

初期化の関数。Start内で実行しておくといいです（これがないと他が動きません）。

```csharp:title=C#
bool LogiSteeringInitialize(CONST bool ignoreXInputControllers)
// ignoreXInputControllers : true なら、X入力コントローラを無視。
```

```csharp:title=例
LogitechGSDK.LogiSteeringInitialize(false);
```

### LogiUpdate

コントローラの接続を最新の状態にする関数です。毎フレーム呼び出す必要があるので、Updateなどで実行する必要があります。

```csharp:title=C#
bool LogiUpdate();
```

```csharp:title=例
void Update()
{
    if (LogitechGSDK.LogiUpdate() && LogitechGSDK.LogiIsConnected(0))
    {
      /* ・・・・・・・・・・・ */
    }
}
```

### LogiIsConnected

指定したインデックスにコントローラが接続されているかどうかをチェックします。SDKではLogiUpdateとともに呼び出されています。

```csharp:title=C#
bool LogiIsConnected(const int index);
// index : コントローラのインデックス 。
```

```csharp:title=例
void Update()
{
    if (LogitechGSDK.LogiUpdate() && LogitechGSDK.LogiIsConnected(0))
    {
      /* ・・・・・・・・・・・ */
    }
}
```

### LogiSteeringShutdown

SDK をシャットダウンし、コントローラオブジェクトを破棄します。終了時に実行しておきましょう。

```csharp:title=C#
bool LogiSteeringShutdown();
```

```csharp:title=例
LogitechGSDK.LogiSteeringShutdown();
```

<div class="ads"></div>

## 入力の取得

基本的にはLogiGetStateUnityを使って取得します。

```csharp:title=C#
DIJOYSTATE2ENGINES LogiGetState(const int index);
```

引数はデバイスのインデックス。0は接続された第1コントローラ、１は第２コントローラに対応します。なので基本0でいいはずです。

戻り値はDIJOYSTATE2ENGINES型。LogitechGSDK.csにDIJOYSTATE2ENGINESの定義があるので見てみましょう。

```csharp:title=C#
public struct DIJOYSTATE2ENGINES
{
    public int lX;                     /* x-axis position              */
    public int lY;                     /* y-axis position              */
    public int lZ;                     /* z-axis position              */
    public int lRx;                    /* x-axis rotation              */
    public int lRy;                    /* y-axis rotation              */
    public int lRz;                    /* z-axis rotation              */
    [MarshalAs(UnmanagedType.ByValArray, SizeConst = 2)]
    public int[] rglSlider;            /* extra axes positions         */
    [MarshalAs(UnmanagedType.ByValArray, SizeConst = 4)]
    public uint[] rgdwPOV;             /* POV directions               */
    [MarshalAs(UnmanagedType.ByValArray, SizeConst = 128)]
    public byte[] rgbButtons;          /* 128 buttons                  */
    public int lVX;                    /* x-axis velocity              */
    public int lVY;                    /* y-axis velocity              */
    public int lVZ;                    /* z-axis velocity              */
    public int lVRx;                   /* x-axis angular velocity      */
    public int lVRy;                   /* y-axis angular velocity      */
    public int lVRz;                   /* z-axis angular velocity      */
    [MarshalAs(UnmanagedType.ByValArray, SizeConst = 2)]
    public int[] rglVSlider;           /* extra axes velocities        */
    public int lAX;                    /* x-axis acceleration          */
    public int lAY;                    /* y-axis acceleration          */
    public int lAZ;                    /* z-axis acceleration          */
    public int lARx;                   /* x-axis angular acceleration  */
    public int lARy;                   /* y-axis angular acceleration  */

    public int lARz;                   /* z-axis angular acceleration  */
    [MarshalAs(UnmanagedType.ByValArray, SizeConst = 2)]
    public int[] rglASlider;           /* extra axes accelerations     */
    public int lFX;                    /* x-axis force                 */
    public int lFY;                    /* y-axis force                 */
    public int lFZ;                    /* z-axis force                 */
    public int lFRx;                   /* x-axis torque                */
    public int lFRy;                   /* y-axis torque                */
    public int lFRz;                   /* z-axis torque                */
    [MarshalAs(UnmanagedType.ByValArray, SizeConst = 2)]
    public int[] rglFSlider;           /* extra axes forces            */
};
```

たくさんあるので、絞ります。Logitech G29の基本的な入力は以下のように反映されます。

```csharp:title=C#
LogitechGSDK.DIJOYSTATE2ENGINES rec;
rec = LogitechGSDK.LogiGetStateUnity(0);
int steering = rec.lX;           // ハンドル
int accel =    rec.lY;           // アクセル（右）
int brake =    rec.lRz;          // ブレーキ（中）
int clutch =   rec.rglSlider[0]; // クラッチ（左）

// ボタン類（最大128種類？）
for (int i = 0; i < 128; i++)
{
    if (rec.rgbButtons[i] == 128)
    {
        buttonStatus += "Button " + i + " pressed\n";
    }
}

// ハンドル左上の十字パッド
switch (rec.rgdwPOV[0])
{
    case (0): actualState += "POV : UP\n"; break;
    case (4500): actualState += "POV : UP-RIGHT\n"; break;
    case (9000): actualState += "POV : RIGHT\n"; break;
    case (13500): actualState += "POV : DOWN-RIGHT\n"; break;
    case (18000): actualState += "POV : DOWN\n"; break;
    case (22500): actualState += "POV : DOWN-LEFT\n"; break;
    case (27000): actualState += "POV : LEFT\n"; break;
    case (31500): actualState += "POV : UP-LEFT\n"; break;
    default: actualState += "POV : CENTER\n"; break;
}
```

LogiGetStateENGINESをラップしている（LogitechGSDK.csを参照）。DirectInput を使用していない場合や、ゲームやプロジェクトに dinput.h をインクルードできない場合はこちらを参照するといいらしいです。

```csharp:title=C#
public static DIJOYSTATE2ENGINES LogiGetStateUnity(int index)
{
    DIJOYSTATE2ENGINES ret = new DIJOYSTATE2ENGINES();
    ret.rglSlider = new int[2];
    ret.rgdwPOV = new uint[4];
    ret.rgbButtons = new byte[128];
    ret.rglVSlider = new int[2];
    ret.rglASlider = new int[2];
    ret.rglFSlider = new int[2];
    try
    {
        ret = (DIJOYSTATE2ENGINES)Marshal.PtrToStructure(LogiGetStateENGINES(index), typeof(DIJOYSTATE2ENGINES));
    }
    catch (System.ArgumentException)
    {
        Debug.Log("Exception catched");
    }
    return ret;
}
```

## エフェクトなど

よりリアルな運転にするために使えそうなエフェクトたちを紹介します。

### SpringForce

```csharp:title=C#
bool LogiPlaySpringForce(const int index,
												 const int offsetPercentage,
												 const int saturationPercentage,
												 const int coefficientPercentage);
// index : コントローラのインデックス 。
// offsetPercentage : バネの力の効果の中心を-100～100で指定。0が中心。
// saturationPercentage : スプリング力効果の飽和レベルを0～100で指定。
// coefficientPercentage : 増加の傾きを指定。 大きいほど、飽和レベルに早く到達。
```

```csharp:title=C#
LogitechGSDK.LogiPlaySpringForce(0, 0, 30, 100);
```

その他にもいくつかハンドルに力を加えるようなものもあります。

- ConstantForce
- DamperForce
- Side Collision Force
- Front Collision Force
- Soft Stop Force

### Dirt Road Effect

```csharp:title=C#
bool LogiPlayDirtRoadEffect(const int index, const int magnitudePercentage);
// index : コントローラのインデックス。
// magnitudePercentage : エフェクトの強さを0～100で指定。
```

```csharp:title=C#
LogitechGSDK.LogiPlayDirtRoadEffect(0, 50);
```

その他にもいくつかのエフェクトがあります。

- Bumpy Road Effect
- Slippery Road Effect
- Surface Effect

### LogiPlayLeds

LEDを操作できる。

```csharp:title=C#
bool LogiPlayLeds(const int index,
									const float currentRPM,
									const float rpmFirstLedTurnsOn,
									const float rpmRedLine);
// index : コントローラのインデックス 。
// currentRPM : 現在の回転数 。
// rpmFirstLedTurnsOn : 最初のLEDが点灯する回転数 。
// rpmRedLine : この回転数より下なら全てのLEDが点灯。上なら全てのLEDが点滅。
```

```csharp:title=C#
LogitechGSDK.LogiPlayLeds(0, 20, 20, 20);
```

<div class="ads"></div>

## まとめ

今回はLogitechSDKのLogitechSteeringWheelで使われている関数をいくつか紹介しました。

紹介しなかったものについては、LogitechSteeringWheel.csを動かすか、SDKに付属しているLogitechGamingSteeringWheelSDK.pdfを参照して学習してください。