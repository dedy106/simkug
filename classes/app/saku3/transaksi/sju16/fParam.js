window.app_saku3_transaksi_sju16_fParam = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fParam.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fParam";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter Modul", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.c_modul = new saiCB(this,{bound:[20,10,200,20],caption:"Modul",tag:9,mustCheck:false,change:[this,"doChange"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar Parameter","Data Parameter","Filter Cari"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
		            colTitle:["Kode","Nama","Modul","Flag","Value1","Value2","Keterangan"],
					colWidth:[[6,5,4,3,2,1,0],[200,100,100,100,100,300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Modul", maxLength:10, tag:2});	
		this.e_flag = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,400,20],caption:"Flag", maxLength:200, tag:1});	
		this.e_val1 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Value 1",tag:1,tipeText:ttNilai, text:"0"});	
		this.e_val2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Value 2",tag:1,tipeText:ttNilai, text:"0"});	
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,400,20],caption:"Keterangan", maxLength:150, tag:1});	
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						
			this.c_modul.items.clear();
			var data = this.dbLib.getDataProvider("select distinct modul as modul from spro where kode_lokasi='"+this.app._lokasi+"' order by modul",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_modul.addItem(i,line.modul);
				}
			}

			this.c_modul.setText("");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fParam.extend(window.childForm);
window.app_saku3_transaksi_sju16_fParam.implement({
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
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into spro(kode_spro,kode_lokasi,nama,modul,flag,value1,value2,keterangan) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_modul.getText()+"','"+this.e_flag.getText()+"',"+parseNilai(this.e_val1.getText())+","+parseNilai(this.e_val2.getText())+",'"+parseNilai(this.e_ket.getText())+"')");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update spro set nama='"+this.e_nama.getText()+"',modul='"+this.e_modul.getText()+"',flag='"+this.e_flag.getText()+"',value1="+parseNilai(this.e_val1.getText())+",value2="+parseNilai(this.e_val2.getText())+",keterangan='"+this.e_ket.getText()+"' "+
					        "where kode_spro = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from spro where kode_spro = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.c_modul.items.clear();
					var data = this.dbLib.getDataProvider("select distinct modul as modul from spro where kode_lokasi='"+this.app._lokasi+"' order by modul",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.c_modul.addItem(i,line.modul);
						}
					}
					this.c_modul.setText("");
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	},
	doChange: function(sender){
		try{
			if (sender==this.c_modul && this.c_modul.getText()!="") {
				this.doLoad();
				this.e_modul.setText(this.c_modul.getText());
			}

			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select kode_spro,nama,modul,flag,value1,value2,keterangan from spro "+
						     "where kode_spro ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_modul.setText(line.modul);
						this.e_flag.setText(line.flag);
						this.e_val1.setText(floatToNilai(line.value1));
						this.e_val2.setText(floatToNilai(line.value2));
						this.e_ket.setText(line.keterangan);
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
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
	doCari:function(sender){								
		if (this.e_kode2.getText() != "") var filter = " kode_spro like '%"+this.e_kode2.getText()+"%' and ";
		else var filter = " nama like '%"+this.e_nama2.getText()+"%' and ";
		var strSQL = "select kode_spro,nama,modul,flag,value1,value2,keterangan "+
		             "from spro "+
					 "where "+filter+" kode_lokasi='"+this.app._lokasi+"' order by kode_spro";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doLoad:function(sender){						
		var strSQL = "select kode_spro,nama,modul,flag,value1,value2,keterangan "+
		             "from spro where kode_lokasi='"+this.app._lokasi+"' and modul='"+this.c_modul.getText()+"' order by kode_spro";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_spro,line.nama,line.modul,line.flag,floatToNilai(line.value1),floatToNilai(line.value2),line.keterangan]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});