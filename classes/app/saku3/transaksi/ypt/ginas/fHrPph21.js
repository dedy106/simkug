window.app_saku3_transaksi_ypt_ginas_fHrPph21 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_ginas_fHrPph21.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_ginas_fHrPph21";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Batas Parameter PPh21", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar Parameter PPh21","Data Parameter PPh21"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:9,
		           colTitle:["Batas Bawah","Batas Atas","Persentase","Pengurang","Nilai PPh"],
					colWidth:[[4,3,2,1,0],[100,100,100,220,80]],
					colFormat:[[0,1,2,3,4],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					defaultRow:1,
					readOnly:true,
					dblClick:[this,"doDoubleClick"],
					autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Batas Bawah", tag:1,  tipeText:ttNilai, text:"0"});	
		this.e_biaya = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Batas Atas", tag:1, tipeText:ttNilai, text:"0"});	
		this.e_jab = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Persentase", tag:1,  tipeText:ttNilai, text:"0"});	
		this.e_jab = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Pengurang", tag:1,  tipeText:ttNilai, text:"0"});
		this.e_jab = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Nilai PPH", tag:1,  tipeText:ttNilai, text:"0"});
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_ginas_fHrPph21.extend(window.childForm);
window.app_saku3_transaksi_ypt_ginas_fHrPph21.implement({
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
					sql.add("insert into hr_pajak(kode_pajak,nama,kode_lokasi,nilai,biaya_jab,jab_max) values ('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_biaya.getText())+","+parseNilai(this.e_jab.getText())+")");
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
					sql.add("delete from hr_pajak where kode_pajak = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("insert into hr_pajak(kode_pajak,nama,kode_lokasi,nilai,biaya_jab,jab_max) values ('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_biaya.getText())+","+parseNilai(this.e_jab.getText())+")");
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
					sql.add("delete from hr_pajak where kode_pajak = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
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
			if (this.cb_kode.getText() != ""){
				var strSQL = "select kode_pajak,nama,nilai,biaya_jab,jab_max from hr_pajak where kode_pajak ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);	
						this.e_nilai.setText(floatToNilai(line.nilai));	
						this.e_biaya.setText(floatToNilai(line.biaya_jab));	
						this.e_jab.setText(floatToNilai(line.jab_max));	
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
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Flag Akun",sender,undefined, 
											  "select kode_pajak, nama  from hr_pajak where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_pajak) from hr_pajak where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_pajak","nama"],"where",["Kode","Nama"],false);				
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
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
	doLoad:function(sender){						
		var strSQL = "select bawah,atas,persen,kurang_seb,nilai_seb from hr_pph21 where kode_lokasi='"+this.app._lokasi+"' order by bawah";	
		
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
			this.sg1.appendData([floatToNilai(line.bawah),floatToNilai(line.atas),floatToNilai(line.persen),floatToNilai(line.kurang_seb),floatToNilai(line.nilai_seb)]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});