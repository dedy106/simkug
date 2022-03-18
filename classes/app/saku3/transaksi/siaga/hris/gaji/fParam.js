window.app_saku3_transaksi_siaga_hris_gaji_fParam = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_gaji_fParam.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_gaji_fParam";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter Gaji", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Param","Data Param"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["Kode","Nama","DC","Indeks"],
					colWidth:[[3,2,1,0],[50,50,300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Kode", maxLength:10, tag:0,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Nama", maxLength:50, tag:0});
		this.e_idx = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Indeks", maxLength:10, tipeText:ttNilai, tag:0});
		this.c_dc = new saiCB(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"DC",items:["C","D"], readOnly:true,tag:2});
		this.c_rutin = new saiCB(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Jenis Parameter",items:["1-REMUNERASI","0-VARIABEL","2-RUMUS","3-MODUL"], readOnly:true,tag:2});
		this.c_pajak = new saiCB(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Param Pajak",items:["1-PJKSETAHUN","2-TDKSETAHUN","0-NONPAJAK"], readOnly:true,tag:2});
		this.cb_klp = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Klp Parameter", multiSelection:false, maxLength:10, tag:2});		

		this.rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);			
		setTipeButton(tbAllFalse);
			
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.c_dc.setText("D");	
			this.cb_klp.setSQL("select kode_klp, nama from gr_gaji_paramklp where kode_lokasi='"+this.app._lokasi+"' ",["kode_klp","nama"],false,["Kode","Nama"],"and","Data Kelompok",true);			

			this.doLoad();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_gaji_fParam.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_gaji_fParam.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into gr_gaji_param(kode_param,nama,kode_lokasi,dc,no_urut,flag_rutin,flag_pajak,kode_klp) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.c_dc.getText()+"',"+parseNilai(this.e_idx.getText())+",'"+this.c_rutin.getText().substr(0,1)+"','"+this.c_pajak.getText().substr(0,1)+"','"+this.cb_klp.getText()+"')");												

					sql.add("insert into gr_gaji_nik(nik,kode_param,kode_lokasi,nilai,jenis_gaji)  "+
							"select nik,'"+this.cb_kode.getText()+"','"+this.app._lokasi+"',0,flag_gaji from gr_karyawan "+
							"where kode_lokasi='"+this.app._lokasi+"'");
					
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_gaji_param where kode_param='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into gr_gaji_param(kode_param,nama,kode_lokasi,dc,no_urut,flag_rutin,flag_pajak,kode_klp) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.c_dc.getText()+"',"+parseNilai(this.e_idx.getText())+",'"+this.c_rutin.getText().substr(0,1)+"','"+this.c_pajak.getText().substr(0,1)+"','"+this.cb_klp.getText()+"')");							
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_gaji_param where kode_param='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from gr_gaji_nik where kode_param='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select * from gr_gaji_param where kode_param ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.e_idx.setText(line.no_urut);
						this.c_dc.setText(line.dc);		
						this.cb_klp.setText(line.kode_klp);
						if (line.flag_rutin == "1") this.c_rutin.setText("1-REMUNERASI");
						if (line.flag_rutin == "2") this.c_rutin.setText("2-RUMUS");
						if (line.flag_rutin == "3") this.c_rutin.setText("2-MODUL");
						if (line.flag_rutin == "0") this.c_rutin.setText("0-VARIABEL");				

						if (line.flag_pajak == "0") this.c_pajak.setText("0-NONPAJAK");
						if (line.flag_pajak == "1") this.c_pajak.setText("1-PJKSETAHUN");
						if (line.flag_pajak == "2") this.c_pajak.setText("2-TDKSETAHUN");
						
						setTipeButton(tbUbahHapus);	
					}
					else setTipeButton(tbSimpan);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));										
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select a.kode_param,a.nama,a.dc,a.no_urut "+
					 "from gr_gaji_param a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut";		
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
			this.sg1.appendData([line.kode_param,line.nama,line.dc,line.no_urut]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});