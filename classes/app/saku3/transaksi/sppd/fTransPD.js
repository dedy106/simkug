window.app_saku3_transaksi_sppd_fTransPD = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sppd_fTransPD.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sppd_fTransPD";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif dan Rute Perjalanan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Tarif Transport","Data Tarif Transport","Cari Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode","Asal","Tujuan","Transportasi","Tarif"],
					colWidth:[[4,3,2,1,0],[200,200,200,200,50]],
                    colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:20,change:[this,"doChange"]});			
		this.e_asal = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Asal", maxLength:50, tag:1});									
		this.e_tujuan = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Tujuan", maxLength:50, tag:1});									
		this.e_kend = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Transportasi",multiSelection:false,tag:1});	
        this.e_tarif = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Tarif", tag:1,  tipeText:ttNilai, text:"0", maxLength:10});
       	this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Status",items:["1 AKTIF","0 NONAKTIF"], readOnly:true,tag:2});
		
		this.e_kode = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_asal2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,300,20],caption:"Asal",maxLength:50,tag:9});		
		this.e_tujuan2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Tujuan",maxLength:50,tag:9});		
		this.e_kend2 = new portalui_saiCBBL(this.pc1.childPage[2],{bound:[20,16,220,20],caption:"Transportasi",multiSelection:false,tag:9});				
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
					
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[2].rearrangeChild(10, 23);			
		setTipeButton(tbSimpan);
		this.setTabChildIndex();

		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doLoad();		

			this.e_kend.setSQL("select kode_jenis, nama from sp_jenis where kode_lokasi = '"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Kendaraan",true);
			this.e_kend2.setSQL("select kode_jenis, nama from sp_jenis where kode_lokasi = '"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Kendaraan",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sppd_fTransPD.extend(window.childForm);
window.app_saku3_transaksi_sppd_fTransPD.implement({
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
					var fAktif = this.c_status.getText().substr(0,1);
					var nama = this.e_asal.getText() + " - " + this.e_tujuan.getText();					
					sql.add("insert into sp_trans(kode_trans,kode_jenis,asal,tujuan,tarif,flag_aktif,nama,kode_lokasi) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_kend.getText()+"','"+this.e_asal.getText()+"','"+this.e_tujuan.getText()+"',"+nilaiToFloat(this.e_tarif.getText())+",'"+fAktif+"','"+nama+"','"+this.app._lokasi+"')");
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
					var fAktif = this.c_status.getText().substr(0,1);
					var nama = this.e_asal.getText() + " - " + this.e_tujuan.getText();
					sql.add("delete from sp_trans where kode_trans = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					sql.add("insert into sp_trans(kode_trans,kode_jenis,asal,tujuan,tarif,flag_aktif,nama,kode_lokasi) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_kend.getText()+"','"+this.e_asal.getText()+"','"+this.e_tujuan.getText()+"',"+nilaiToFloat(this.e_tarif.getText())+",'"+fAktif+"','"+nama+"','"+this.app._lokasi+"')");
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
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
		}
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var strSQL = "select * from sp_trans where kode_trans ='"+this.cb_kode.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_asal.setText(line.asal);		
						this.e_tujuan.setText(line.tujuan);		
						this.e_kend.setText(line.kode_jenis);		
						this.e_tarif.setText(floatToNilai(line.tarif));
						if (line.flag_aktif == "1") this.c_status.setText("1 AKTIF");
						else this.c_status.setText("0 NONAKTIF");	                        		
																				
						setTipeButton(tbUbah);
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbah);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));					
			}
		} catch(e) {alert(e);}
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
		var strSQL = "select kode_trans,a.kode_jenis,b.nama,asal,tujuan,tarif,flag_aktif "+
					 "from sp_trans a "+
                     "inner join sp_jenis b on a.kode_jenis = b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);		
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
			this.sg1.appendData([line.kode_trans,line.asal,line.tujuan,line.kode_jenis,line.tarif]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doCari:function(sender){								
		try {
			var filter = " ";
			if (this.e_kode.getText() != "") filter =  " and a.kode_trans like '%"+this.e_kode.getText()+"%' ";
			else if (this.e_asal2.getText() != "")  filter += " and a.asal like '%"+this.e_asal2.getText()+"%' ";
            else if (this.e_tujuan2.getText() != "")  filter += " and a.tujuan like '%"+this.e_tujuan2.getText()+"%' ";
            else if (this.e_kend2.getText() != "") filter += " and b.kode_jenis like '%"+this.e_kend2.getText()+"%' ";
			
				var strSQL = "select a.kode_trans,a.kode_jenis,b.nama,a.asal,a.tujuan,a.tarif,a.flag_aktif "+
							 "from sp_trans a "+
                     		 "inner join sp_jenis b on a.kode_jenis = b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"'  "+filter;		
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	}
});