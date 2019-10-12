(function() {
//ここに処理
var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'Hello') {
            switch (args[0]) {
            case 'World':
public class MainActivity extends AppCompatActivity {

    RewardedVideoAd mRewardedVideoAd;
    String movie_id = "ca-app-pub-3940256099942544/5224354917";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.MainActivity);

        MobileAds.initialize(this, movie_id); // 初期化
        mRewardedVideoAd = MobileAds.getRewardedVideoAdInstance(this); // インスタンスの生成


        mRewardedVideoAd.setRewardedVideoAdListener(new RewardedVideoAdListener()
        {
            @Override
            public void onRewarded(RewardItem reward) {
                // 動画広告再生に対する報酬を与えたときの処理
            }

            @Override
            public void onRewardedVideoAdLeftApplication() {
                // 動画広告から離れるときの処理(ブラウザに行くなど)
            }

            @Override
            public void onRewardedVideoAdClosed() {
                // 動画の再生を終了したときの処理
            }

            @Override
            public void onRewardedVideoAdFailedToLoad(int errorCode) {
                // 動画の読み込みが失敗したときの処理
            }

            @Override
            public void onRewardedVideoAdLoaded() {
                // 動画を再生する準備が完了したときの処理
                if (mRewardedVideoAd.isLoaded())
                {
                    mRewardedVideoAd.show();
                }
            }

            @Override
            public void onRewardedVideoAdOpened() {
                // 動画画面に遷移したときの処理
            }

            @Override
            public void onRewardedVideoStarted() {
                // 動画を再生を開始したときの処理
            }

            @Override
            public void onRewardedVideoCompleted() {
                // 動画を最後まで見終わったときの処理
            }
        });

        mRewardedVideoAd.loadAd(movie_id, new AdRequest.Builder().build()); // 広告のリクエスト
    }
}
                break;
            }
        }
    };
})();
