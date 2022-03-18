window.app_saku3_transaksi_uin_fSatker = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fSatker.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fSatker";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data SatKer", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		

		this.cb_dept = new portalui_saiCBBL(this,{bound:[20,9,220,20],caption:"Kementrian",maxLength:20,multiSelection:false,change:[this,"doChange"]});		
	
		this.pc1 = new pageControl(this,{bound:[20,10,1000,405], childPage:["Dept - Unit"]});						
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
		            colTitle:["Kode","Nama Satuan Kerja","Lok","Dt2","KPPN","No SP"],
					colWidth:[[5,4,3,2,1,0],[60,60,60,60,500,100]],
					readOnly:true,
					autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
				
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
			this.cb_dept.setSQL("select kddept, nmdept from uin_dept",["kddept","nmdept"],false,["Kode","Nama"],"and","Data Departemen",true);
			this.cb_dept.setText("025");	
			this.doLoad();							
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fSatker.extend(window.childForm);
window.app_saku3_transaksi_uin_fSatker.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);				
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_dept && this.cb_dept.getText()!="") {
				this.doLoad();
			}
			
			
			
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	doLoad:function(sender){
	
		var sql2="";
		if (this.cb_dept.getText() != ""){
			sql2="where kddept='"+this.cb_dept.getText()+"' ";
		}	
		var sql = "select kdsatker,nmsatker,kdlokasi,kdkabkota,kdkppn,nomorsp from uin_satker where kdsatker='424188' "
				"order by kdsatker ";
	
		var data = this.dbLib.getDataProvider(sql,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kdsatker,line.nmsatker,line.kdlokasi,line.kdkabkota,line.kdkppn,line.nomorsp]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
