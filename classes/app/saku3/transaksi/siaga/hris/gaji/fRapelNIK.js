window.app_saku3_transaksi_siaga_hris_gaji_fRapelNIK = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_gaji_fRapelNIK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_gaji_fRapelNIK";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Rapel Gaji per NIK", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Rapel","Data Rapel"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["NIK","Nama","Periode Awal","Periode Akhir"],
					colWidth:[[3,2,1,0],[100,100,300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.c_tahun1 = new saiCB(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Periode Awal",readOnly:true,tag:2,change:[this,"doChange"]});
		this.c_bulan1 = new saiCB(this.pc1.childPage[1],{bound:[230,12,60,20],caption:"",labelWidth:0,readOnly:true,tag:2, items:["01","02","03","04","05","06","07","08","09","10","11","12"],change:[this,"doChange"] });
		this.c_tahun2 = new saiCB(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Periode Akhir",readOnly:true,tag:2});
		this.c_bulan2 = new saiCB(this.pc1.childPage[1],{bound:[230,13,60,20],caption:"",labelWidth:0,readOnly:true,tag:2, items:["01","02","03","04","05","06","07","08","09","10","11","12"]});
		
		this.cb_nik = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_remlama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"REM Lama", maxLength:10, tipeText:ttNilai, readOnly:true, text:"0",tag:0});	
		this.e_rembaru = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"REM Baru", maxLength:10, tipeText:ttNilai, readOnly:true, text:"0",tag:0});	

		this.rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);			
		setTipeButton(tbSimpan);
			
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_nik.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.c_tahun1.items.clear();
			this.c_tahun2.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate()) + 1",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_tahun1.addItem(i,line.tahun);
					this.c_tahun2.addItem(i,line.tahun);
				}
			}
			
			var data = this.dbLib.getDataProvider("select substring(convert(varchar,getdate(),112),1,6) as periode ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];	
				this.c_tahun1.setText(line.periode.substr(0,4));
				this.c_tahun2.setText(line.periode.substr(0,4));
				this.c_bulan1.setText(line.periode.substr(4,2));
				this.c_bulan2.setText(line.periode.substr(4,2));

			}
			
			this.doLoad();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_gaji_fRapelNIK.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_gaji_fRapelNIK.implement({
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

					sql.add("delete from gr_gaji_rapel where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					

					var perAwal = this.c_tahun1.getText()+this.c_bulan1.getText();
					var perAkhir = this.c_tahun2.getText()+this.c_bulan2.getText();
					sql.add("insert into gr_gaji_rapel(nik,kode_lokasi,rem_lama,rem_baru,per_awal,per_akhir,tgl_input,nik_user) values "+
							"('"+this.cb_nik.getText()+"','"+this.app._lokasi+"',"+nilaiToFloat(this.e_remlama.getText())+","+nilaiToFloat(this.e_rembaru.getText())+",'"+perAwal+"','"+perAkhir+"',getdate(),'"+this.app._userLog+"')");												
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
					
					sql.add("delete from gr_gaji_rapel where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					var perAwal = this.c_tahun1.getText()+this.c_bulan1.getText();
					var perAkhir = this.c_tahun2.getText()+this.c_bulan2.getText();
					sql.add("insert into gr_gaji_rapel(nik,kode_lokasi,rem_lama,rem_baru,per_awal,per_akhir,tgl_input,nik_user) values "+
							"('"+this.cb_nik.getText()+"','"+this.app._lokasi+"',"+nilaiToFloat(this.e_remlama.getText())+","+nilaiToFloat(this.e_rembaru.getText())+",'"+perAwal+"','"+perAkhir+"',getdate(),'"+this.app._userLog+"')");												

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
					sql.add("delete from gr_gaji_rapel where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_nik);
					setTipeButton(tbAllFalse);
					this.doLoad();
					this.pc1.setActivePage(this.pc1.childPage[0]);	
				break;
			case "simpan" :	
				/*
				if (nilaiToFloat(this.e_rembaru.getText()) < nilaiToFloat(this.e_remlama.getText())) {
					system.alert(this,"Nilai REM baru tidak boleh lebih kecil dari REM lama","");
					return false;
				}
				*/
				var perAwal = this.c_tahun1.getText()+this.c_bulan1.getText();
				var perAkhir = this.c_tahun2.getText()+this.c_bulan2.getText();
				if (perAwal > perAkhir) {
					system.alert(this,"Periode tidak valid","Periode Akhir tidak boleh lebih kecil dari periode Awal.");
					return false;
				}
				else this.simpan();
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
			if (sender == this.c_tahun1 || sender == this.c_bulan1) {
				if (this.c_tahun1.getText()!="" && this.c_bulan1.getText()!="") {
					this.periodeBefore = getPrevPeriode(this.c_tahun1.getText()+this.c_bulan1.getText());
					this.doChange(this.cb_nik);
				}
			}
			if (sender == this.cb_nik && this.cb_nik.getText() != ""){				
				//gaji terakhir sebelum rapel aktif
				var data = this.dbLib.getDataProvider("select top 1 no_gaji as no_gaji from gr_gaji_d where periode = '"+this.periodeBefore+"' and nik ='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_gaji desc",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						var noGaji = line.no_gaji;
					}
				}
				var data = this.dbLib.getDataProvider("select isnull(sum(nilai),0) as rem from gr_gaji_d where no_gaji='"+noGaji+"' and kode_param in ('GAPOK','KONJ','TUJAB','TGRD') and  periode = '"+this.periodeBefore+"' and nik ='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_remlama.setText(floatToNilai(line.rem));						
					}
				}

				var data = this.dbLib.getDataProvider("select sum(nilai) as rem from gr_gaji_nik where kode_param in ('GAPOK','KONJ','TUJAB','TGRD') and nik ='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_rembaru.setText(floatToNilai(line.rem));						
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
				//setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_nik.setText(this.sg1.cells(0,row));										
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select a.nik,a.nama,b.per_awal,b.per_akhir "+
					 "from gr_karyawan a inner join gr_gaji_rapel b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.nik";		
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
			this.sg1.appendData([line.nik,line.nama,line.per_awal,line.per_akhir]); 
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_nik.getText()+")");							
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