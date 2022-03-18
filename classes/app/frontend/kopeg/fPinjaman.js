//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_kopeg_fPinjaman = function(owner){
	try{
		if (owner)
		{
			window.app_frontend_kopeg_fPinjaman.prototype.parent.constructor.call(this, owner);
			window.app_frontend_kopeg_fPinjaman.prototype.parent.setBorder.call(this, 0);		
			window.app_frontend_kopeg_fPinjaman.prototype.parent.setColor.call(this, "");		
			this.className = "app_frontend_kopeg_fPinjaman";											
			this.initComponent();		
			this.title = "Unit Pinjaman";
		}
	}catch(e)
	{
		systemAPI.alert("[app_frontend_kopeg_fPinjaman]::contruct:"+e,"");
	}
};
window.app_frontend_kopeg_fPinjaman.extend(window.portalui_panel);
window.app_frontend_kopeg_fPinjaman.implement({
	initComponent: function(){
		try{			
			uses("util_standar");			
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.img = new portalui_image(this);													
			this.img.setBound(0,0,this.app._mainForm.tab.width-2,100);					
			this.img.setImage("image/themes/"+system.getThemes()+"/logo_depan_kopeg.png");
			this.profile = new portalui_FEtabPanel(this);
			this.profile.setBound(10,(document.all ? 104 : 102),260,410);					
			this.profile.setBgColor("");	
			this.profile.addPage([" UNIT PINJAMAN "]);						
			this.profile.setBackground("#ffffff");
			this.profile.onTabChange.set(this,"doTabChange");
			this.profile.childPage[0].getCanvas().style.background="url(image/themes/"+system.getThemes()+"/back_tab.gif)";
			this.profile.onChildItemsClick.set(this,"doChildItemsClick");
			
			this.detail = new portalui_FEtabPanel(this);
			this.detail.setBound(290,(document.all ? 104 : 102),this.app._mainForm.tab.width - (document.all ? 320: 330), document.all ? 410:400);					
			this.detail.setBgColor("");			
			this.detail.addPage(["Deskripsi"]);
			this.detail.onTabChange.set(this,"doTabChange");
			this.detail.childPage[0].getCanvas().style.background="url(image/themes/"+system.getThemes()+"/back_tab.gif)";
			this.dbLib.getDataProviderA("select judul,kode_konten from portal_konten where kode_klp='K10' and kode_lokasi='"+this.app._kodeLokasi+"'");
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChildItemsClick: function(sender,id,item){
		try{			
			if (id == "SIMPINJ"){
				this.formSimulasi();
			}else{
				var temp = this.dbLib.getDataProvider("select judul,deskripsi from portal_konten where kode_konten='"+id+"' ");
				eval("temp ="+temp+";");
				if (temp!=undefined){
					tmp=temp.rs.rows;
					if (tmp[0]!=undefined)
					{
						if (this.pForm !== undefined){
							this.pForm.free();
							this.pForm = undefined;
						}
						var data=tmp[0];
						this.detail.setChildCaption(0,data.judul);					
						var canvas = this.detail.childPage[0].getCanvas();
						this.detail.childPage[0].setWidth(this.detail.width - (document.all ? 0: 10));
						canvas.style.padding="5px";
						canvas.style.overflow="auto";
						canvas.innerHTML="<div style='font-size:12px;'>"+data.deskripsi+"</div>";
					}
				}else throw("temp="+temp);
			}
		}catch(e){
			systemAPI.alert("fUsaha::doChildItemsClick : "+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){			
			if (methodName == "getDataProvider"){
				eval("result= "+result+";");
				for (var i in result.rs.rows){				
					this.profile.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>"+result.rs.rows[i].judul+"</td></tr></table>",result.rs.rows[i].kode_konten,"");
				}
				this.profile.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Simulasi Pinjaman</td></tr></table>","SIMPINJ","");
				if (result.rs.rows[0] != undefined)
					this.doChildItemsClick(this.profile,result.rs.rows[0].kode_konten);
			}
		}
	},
	formSimulasi: function(){
		try{			
			uses("portalui_panel;portalui_saiGrid;portalui_sgNavigator;portalui_button;portalui_saiLabelEdit;portalui_checkBox");			
			this.pForm = new portalui_panel(this.detail);
			this.pForm.setBound(1,1,this.detail.width - 2, this.detail.height - (document.all ? 20 : 10));									
			this.eNilai = new portalui_saiLabelEdit(this.pForm);
			this.eNilai.setBound(10,20,200,20);
			this.eNilai.setTipeText(ttNilai);
			this.eNilai.setCaption("Plafon");
			this.eAngsur = new portalui_saiLabelEdit(this.pForm);
			this.eAngsur.setBound(270,20,200,20);
			this.eAngsur.setTipeText(ttNilai);
			this.eAngsur.setCaption("Angsuran");					
			this.eAngsur.setReadOnly(true);
			this.eBunga = new portalui_saiLabelEdit(this.pForm);
			this.eBunga.setBound(10,43,150,20);
			this.eBunga.setTipeText(ttNilai);
			this.eBunga.setCaption("Bunga(%)");						
			this.eJenis = new portalui_saiCB(this.pForm);
			this.eJenis.setBound(270,43,200,20);
			this.eJenis.setCaption("Jenis Angsuran");		
				this.eJenis.addItem(0,"Flat");
				this.eJenis.addItem(1,"Anuitas");			
			this.eLama = new portalui_saiLabelEdit(this.pForm);
			this.eLama.setBound(10,66,150,20);
			this.eLama.setCaption("Lama Bayar");
										
			this.bStart = new portalui_button(this.pForm);
			this.bStart.setBound(270,66, 80,18);
			this.bStart.setCaption("Simulasi");
			this.bStart.onClick.set(this,"doClick");			
			this.sg = new portalui_saiGrid(this.pForm);
			this.sg.setBound(10,89,460, 250);
			this.sg.setColCount(4);
			this.sg.setColTitle(["Saldo Awal","Pokok","Margin","Saldo Akhir"]);
			this.sg.setColWidth([3,2,1,0],[100,100,100,100]);			
			this.sg.setColFormat([3,2,1,0],[cfNilai,cfNilai,cfNilai,cfNilai]);
			this.sgn = new portalui_sgNavigator(this.pForm);
			this.sgn.setBound(10,350,460, 25);
			this.sgn.setButtonStyle(5);
			this.sgn.setGrid(this.sg);			
			this.sgn.onBeforePrint.set(this, "doBeforePrint");
			this.pForm.setTabChildIndex();
			this.refBtn = new portalui_imageButton(this.sgn);
			this.refBtn.setBound(this.sgn.width - 35,2,22,22);		
			this.refBtn.setImage("icon/"+system.getThemes()+"/reload.png");
			this.refBtn.setHint("Refresh");
			this.refBtn.onClick.set(this, "sgnRefresh");			
			this.refBtn.setName("refBtn");
		}catch(e){
			systemAPI.alert("create form:"+e);
		}		
	},
	doBeforePrint: function(sender){
		try{
			this.sgn.printHeader = "<span style='{font-size:15;font-weight:bold;font-family:arial;}'>SIMULASI PINJAMAN</span>"+
								"<table> "+		
									"<tr><td class='isi_laporan'>Plafon</td><td>:</td><td class='isi_laporan'>"+this.eNilai.getText()+"</td><td class='isi_laporan'>Angsuran</td><td>:</td><td class='isi_laporan'>"+this.eAngsur.getText()+"</td></tr>"+
									"<tr><td class='isi_laporan'>Bunga</td><td>:</td><td class='isi_laporan'>"+this.eBunga.getText()+"</td><td class='isi_laporan'>Jenis</td><td>:</td><td class='isi_laporan'>"+this.eJenis.getText()+"</td></tr>"+
									"<tr><td class='isi_laporan'>Jangka Waktu</td><td>:</td><td class='isi_laporan'>"+this.eLama.getText()+"</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>"+
								"</table>";
		}catch(e){
			systemAPI.alert(e);
		}								
	},
	sgnRefresh : function(){
		this.sgn.refreshPage();
	},
	doClick: function(sender){
		var lm = nilaiToFloat(this.eLama.getText());
		var so = nilaiToFloat(this.eNilai.getText());
		var bunga = nilaiToFloat(this.eBunga.getText());				
		var pokok = Math.round(so / lm);
		var margin = Math.round(so * bunga / 100 / 12);
		var tot = so + (margin * lm);
		var angs = Math.round(tot / lm);
		var pay = so;
		this.eAngsur.setText(floatToNilai(angs));
		this.sg.clear();		
		for (var i = 0;i < lm;i++){
			if (this.eJenis.getText() == "Flat"){								
				this.sg.appendData([floatToNilai(so),floatToNilai(pokok),floatToNilai(margin),floatToNilai(so - pokok)]);								
				so = so - pokok;
				if (so < pokok) pokok = so;
				else if ( i == lm - 2) pokok = so; 
			}else{					
				var value = annuity(bunga /12 / 100, lm - i, lm, so);					
				eval("value = "+value+";");
				this.sg.appendData([floatToNilai(value.totPayment),floatToNilai(value.pokok),floatToNilai(value.margin),floatToNilai(value.totPayment - value.pokok)]);								
				this.eAngsur.setText(floatToNilai(value.payment));
			}
		}
	}
});