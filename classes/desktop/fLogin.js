//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.desktop_fLogin = function(owner){
	try{
		if (owner)
		{
			window.desktop_fLogin.prototype.parent.constructor.call(this, owner);
			window.desktop_fLogin.prototype.parent.setBorder.call(this, 0);		
			window.desktop_fLogin.prototype.parent.setColor.call(this, "");		
			this.className = "desktop_fLogin";											
			this.initComponent();		
			this.title = "Login";
		}
	}catch(e)
	{
		systemAPI.alert("[desktop_fLogin]::contruct:"+e,"");
	}
};
window.desktop_fLogin.extend(window.portalui_panel);
window.desktop_fLogin.implement({
	initComponent: function(){		
		try{									
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.pLogin = new portalui_panel(this,{bound:[this.width - 400,this.height - 200,300,130],caption:"Login"});						
			this.uid = new portalui_saiLabelEdit(this.pLogin,{bound:[10,30,280,20],labelWidth:80,caption:"User Id"});
			this.pwd = new portalui_saiLabelEdit(this.pLogin,{bound:[10,53,280,20],labelWidth:80, caption:"Password",password:true,keyDown:[this,"doEditKeyDown"]});						
			this.bLogin = new portalui_button(this.pLogin,{bound:[80,99,80,20],caption:"Login",click:[this,"doClick"]});
			this.bSignUp = new portalui_button(this.pLogin,{bound:[180,99,80,20],caption:"Sign Up",click:[this,"doClick"]});			
			this.cont = new portalui_control(this,{bound:[100,100,system.screenWidth, system.screenHeight-100]});			
			this.cont.getCanvas().style.width = "auto";
			this.cont.getCanvas().style.height = "auto";
			this.cont.getCanvas().style.margin = "5px";
			this.cont.getCanvas().innerHTML = "<span style='font-size:15;color:#ffffff' align='right'>welcome to</span><br>"+
				"<span style='font-size:30;color:#ffffff'>roo<font color='#ff9900'>J</font>ax (<font color='#ff9900'>j</font>amboo)</span>"+
				"<br><span style='font-size:10;color:#ffffff' align='right'> SAI &copy; 2009</span>";		
			this.setTabChildIndex();
            this.logo = new portalui_image(this,{bound:[10,80,100,100]});             
            if (Liquid)
            Liquid({
                scale:2000,
                src:"image/jamboologo.png",
                target:this.logo.cnv,
                direction:"top"                
            });
            		 
			this.uid.setFocus();       
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSizeChange: function(width, height){
		try{
			if (this.pLogin != undefined)
				this.pLogin.setBound(width - 400,height - 200,300,130);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doClick: function(sender){
		try{
			var data = "";
			if (sender == this.bLogin){			
				if (this.pSignUp !== undefined)
					this.pSignUp.hide();
				data = this.dbLib.getDataProvider("select uname from sysuser where uid = '"+this.uid.getText()+"' and pwd = '"+this.pwd.getText()+"' ");								
				eval("data = "+data+";");
				if (typeof(data) == "object"){
					if (data.rs.rows[0] != undefined){
						this.app.userlog = this.uid.getText();
						this.app.uname = data.rs.rows[0].uname;
						this.app.logtime = new Date().valueOf();
						this.app.islogin = true;
						this.app._mainForm.showTaskBar();						
					}else throw("User or Password incorrect");
				}else throw("User or Password incorrect");
			}else if (sender == this.bSignUp){
				this.pLogin.hide();
				if (this.pSignUp === undefined)
					this.createSignUp();
				this.pSignUp.show();
			}else {
				if (this.pwdu.getText() != this.rpwdu.getText()){
					systemAPI.alert("Password tidak sama dengan Retype Password");
				}else{
					this.dbLib.execQuery("insert into sysuser (uid, uname, pwd, tipe, email)values "+
					"	('"+this.uidu.getText()+"','"+this.uname.getText()+"','"+this.pwdu.getText()+"', 'U','"+this.email.getText()+"') ");
				}
			}
		}catch(e){
			systemAPI.alert(e,data);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execQuery" :
					if (result.toLowerCase().search("error") == -1){
						system.info(this.getForm(),"Transaksi Sukses","");
						this.app.userlog = this.uidu.getText();
						this.app.uname = this.uname.getText();
						this.app.logtime = new Date().valueOf();
						this.pSignUp.hide();
						this.app.islogin = true;
						this.app._mainForm.showTaskBar();						
					}else{
						systemAPI.alert(result);
					}
					break;
			}
		}		
	},
	createSignUp: function(){
		this.pSignUp = new portalui_panel(this);
		this.pSignUp.setBound(this.width - 400,this.height - 300,300,200);
		this.pSignUp.setCaption("Sign Up");					
		
		this.uidu = new portalui_saiLabelEdit(this.pSignUp);
		this.uidu.setLabelWidth(80);
		this.uidu.setBound(10,30,280,20);
		this.uidu.setCaption("User Id");
		
		this.uname = new portalui_saiLabelEdit(this.pSignUp);
		this.uname.setLabelWidth(80);
		this.uname.setBound(10,33,280,20);
		this.uname.setCaption("Nama");
		
		this.email = new portalui_saiLabelEdit(this.pSignUp);
		this.email.setLabelWidth(80);
		this.email.setBound(10,36,280,20);
		this.email.setCaption("Email");
		
		this.pwdu = new portalui_saiLabelEdit(this.pSignUp);
		this.pwdu.setLabelWidth(80);
		this.pwdu.setBound(10,53,280,20);
		this.pwdu.setCaption("Password");
		this.pwdu.setPassword(true);
		
		this.rpwdu = new portalui_saiLabelEdit(this.pSignUp);
		this.rpwdu.setLabelWidth(80);
		this.rpwdu.setBound(10,54,280,20);
		this.rpwdu.setCaption("Retype ");
		this.rpwdu.setPassword(true);
		
		this.bSubmit = new portalui_button(this.pSignUp);
		this.bSubmit.setBound(10,55,80,20);		
		this.bSubmit.setCaption("Submit");
		this.bSubmit.onClick.set(this,"doClick");
		this.pSignUp.rearrangeChild(30,23);				
	},
	doEditKeyDown: function(sender, keyWord){
		if (keyWord == 13){
			this.bLogin.click();
		}
	}
});
