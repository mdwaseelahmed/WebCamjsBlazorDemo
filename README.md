1.	Download webcam.min.js from GitHub
https://github.com/jhuckaby/webcamjs

2.	Create new folder in wwwroot as webcamjs
3.	Add webcam.min.js in the folder

4.	In the Host.cshtml or Index.html file add reference of JavaScript files
<script type="text/javascript" src="~/webcamjs/webcam.min.js"></script>
<script src="~/webcamjs/ Configuration.js"></script>

5.	Create a new JavaScript file for Configuration named as Configuration and write a that is given below.
6.	
function ready() {
	if (document.readyState == 'complete') {
		Webcam.set({
			width: 320,
			height: 240,
			image_format: 'jpeg',
			jpeg_quality: 90
		});
		try {
			Webcam.attach('#camera');
		} catch (e) {
			alert(e);
		}
	}
}

function take_snapshot() {
	// take snapshot and get image data
	var data = null;
	Webcam.snap(function (data_uri) {
		
		data = data_uri;
	});
	return data; 
}

7.	Inject IJSRuntime in the component
@inject IJSRuntime JSRuntime
8.	Call JavaScript Configuration to access webcam
`<button @onclick="Capture">Capture</button>

<div class="col-md-2"></div>
<div class="col-md-4">
    <div class="panel panel-default">
        <div class="panel-heading">Camera</div>
        <div class="panel-body">
            <div id="camera"></div>
            <!-- A button for taking snaps -->
        </div>
    </div>
</div>
<div class="col-md-4">
    <div class="panel panel-default">
        <div class="panel-heading">Captured Photo</div>
        <div class="panel-body">
            <div id="results">Your captured image will appear here...</div>
        </div>
        <br />
        <br />
    </div>
</div>

@foreach (var item in stringList)
{
    <img src="@item" alt="Alternate Text" width="200px;" height="200px;" />
}



@code
{
    List<string> stringList = new List<string>();
    string aa = "";
    public async void Capture()
    {
        stringList.Add(await JSRuntime.InvokeAsync<string>("take_snapshot"));
        StateHasChanged();
    }

    protected override void OnAfterRender(bool firstRender)
    {
        if (firstRender)
        {
            JSRuntime.InvokeVoidAsync("ready", this);
        }
    }
}
`


