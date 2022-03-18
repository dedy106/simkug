window.app_saku3_transaksi_ypt_logistik_fFaMutasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_logistik_fFaMutasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_logistik_fFaMutasi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Mutasi Aktiva Tetap", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Mutasi", underline:true});
        this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 	
        
        this.pc2 = new pageControl(this,{bound:[5,10,1000,430], childPage:["Data Mutasi","List Mutasi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:9,
					colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Lokasi Lama","Lokasi Baru"],
					colWidth:[[5,4,3,2,1,0],[100,100,390,180,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Mutasi",click:[this,"doLoad3"]});				

        this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
        this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
        this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,300,20],caption:"No Dokumen",maxLength:20, tag:1});	
        this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,29,432,20],caption:"Keterangan",maxLength:200, tag:1});
        this.cb_nofa = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"No Aktiva Tetap", multiSelection:false, tag:1,change:[this,"doChange"]});
		this.e_nama = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,432,20],caption:"Deskripsi",maxLength:150,tag:1,readOnly:true});				
		this.e_seri = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,432,20],caption:"Nomor Seri",maxLength:50, tag:1,readOnly:true});
        this.e_merk = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,432,20],caption:"Merk",maxLength:100, tag:1,readOnly:true});
        this.e_tipe = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,432,20],caption:"Tipe",maxLength:100, tag:1,readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Nilai Perolehan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});					
		this.e_pp = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,20,200,20],caption:"PP Aktap",maxLength:100,tag:1,readOnly:true});
		this.e_klp = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,21,200,20],caption:"Kelompok Aktap",maxLength:100, tag:1,readOnly:true});
		this.e_klpakun = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,22,200,20],caption:"Kelompok Akun",maxLength:100, tag:1,readOnly:true});
        this.cb_nik1 = new saiCBBL(this.pc2.childPage[0],{bound:[20,25,220,20],caption:"Nik Pengirim", multiSelection:false, maxLength:10, tag:1});
        this.cb_nik2= new saiCBBL(this.pc2.childPage[0],{bound:[20,26,220,20],caption:"Nik Penerima", multiSelection:false,maxLength:10, tag:1});
        this.e_lokfa = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,24,200,20],caption:"Lok Asset Lama",maxLength:100, tag:1,readOnly:true});
        this.cb_lokfa2 = new saiCBBL(this.pc2.childPage[0],{bound:[20,27,220,20],caption:"Lok Asset Tujuan", multiSelection:false, maxLength:10, tag:1});
        
		
        this.rearrangeChild(10, 23);
        this.pc2.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
			this.stsSimpan = 1;					
			this.doSelectDate(this.dp_d2,this.dp_d2.year,this.dp_d2.month,this.dp_d2.day);
			
           
            this.cb_nofa.setSQL("select no_fa, nama from fa_asset where kode_lokasi='"+this.app._lokasi+"' and no_fa like '"+this.app._lokasi+"-FA%' ",["no_fa","nama"],false,["Kode","Nama"],"and","Data Asset",true);
            this.cb_nik1.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pengirim",true);
            this.cb_nik2.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Penerima",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_logistik_fFaMutasi.extend(window.childForm);
window.app_saku3_transaksi_ypt_logistik_fFaMutasi.implement({
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
            if (this.stsSimpan == 1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fa_mutasilok_m","no_mutasi",this.app._lokasi+"-MU"+this.e_periode.getText().substr(2,4)+".","0000"));					
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					if(this.stsSimpan == 0){

						sql.add("update fa_asset set kode_lokfa='"+this.e_lokfa.getText()+"' "+
							"where no_fa='"+this.cb_nofa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from fa_mutasilok_m where no_mutasi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
											
					sql.add("insert into fa_mutasilok_m(no_mutasi,kode_lokasi,periode,no_fa,no_dokumen,keterangan,tanggal,nik_pengirim,nik_penerima,kode_lokasal,kode_loktuj,nik_user,tgl_input) values "+
                            "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.cb_nofa.getText()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"','"+this.cb_nik1.getText()+"','"+this.cb_nik2.getText()+"','"+this.e_lokfa.getText()+"','"+this.cb_lokfa2.getText()+"','"+this.app._userLog+"',getdate())");	
                    
                    sql.add("update fa_asset set kode_lokfa='"+this.cb_lokfa2.getText()+"' "+
							"where no_fa='"+this.cb_nofa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
								
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
			case "ubah"	:
                if(this.e_lokfa.getText()==this.cb_lokfa2.getText()){
                    system.alert(this,"Transaksi tidak valid.","Lokasi Asset Baru tidak boleh sama dengan Lokasi Asset Lama.");
                    return false;
                }	
                if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}							
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
                    }
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update fa_asset set kode_lokfa = '"+this.e_lokfa.getText()+"' where no_fa='"+this.cb_nofa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fa_mutasilok_m where no_mutasi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;		
		}
	},
	
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick();
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0) {
				this.sg3.clear(1); 
			}
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fa_mutasilok_m","no_mutasi",this.app._lokasi+"-MU"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
			this.stsSimpan = 1;
			setTipeButton(tbSimpan);
		}
	},
	doChange:function(sender){	
		if (sender == this.cb_nofa && this.cb_nofa.getText() != "" && this.stsSimpan == 1) {
			var data = this.dbLib.getDataProvider(
			           "select a.kode_klpfa,a.kode_klpakun,a.kode_akun,a.nama,a.merk,a.tipe,a.no_seri,a.nilai,a.kode_pp,a.kode_lokfa,a.jenis,b.nama as nama_klpakun "+
                       "from fa_asset a "+
                       "	 inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_fa = '"+this.cb_nofa.getText()+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
                    this.e_nama.setText(line.nama);	
                    this.e_seri.setText(line.no_seri);	
                    this.e_merk.setText(line.merk);
                    this.e_tipe.setText(line.tipe);
                    this.e_pp.setText(line.kode_pp);
                    this.e_klp.setText(line.kode_klpfa);
                    this.e_klpakun.setText(line.kode_klpakun);
					// this.e_akun.setText(line.kode_akun + " - "+line.nama_akun);
                    this.e_nilai.setText(floatToNilai(line.nilai));	
					this.e_lokfa.setText(line.kode_lokfa);	
					this.cb_lokfa2.setSQL("select kode_lok, nama from fa_lokasi where kode_lok <> '"+this.e_lokfa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_lok","nama"],false,["Kode","Nama"],"and","Data Lokasi Asset",true);			
				} 
			} 
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
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
    doLoad3:function(sender){			
		var strSQL = "select a.no_mutasi,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.kode_lokasal,a.kode_loktuj "+
		             "from fa_mutasilok_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_mutasi,line.tgl,line.no_dokumen,line.keterangan,line.kode_lokasal,line.kode_loktuj]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL ="select a.tanggal,a.no_dokumen,a.no_fa,a.keterangan,b.nama,b.no_seri,b.merk,b.tipe,b.nilai,b.kode_klpfa,b.kode_klpakun,a.nik_pengirim,a.nik_penerima,a.kode_lokasal,a.kode_loktuj,b.kode_pp "+
							"from fa_mutasilok_m a "+
							"inner join fa_asset b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_mutasi='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d2.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
                        this.cb_nofa.setText(line.no_fa);
                        this.e_nama.setText(line.nama);				
                        this.e_seri.setText(line.no_seri);
                        this.e_merk.setText(line.merk);
                        this.e_tipe.setText(line.tipe);
                        this.e_nilai.setText(line.nilai);	
                        this.e_pp.setText(line.kode_pp);
                        this.e_klp.setText(line.kode_klpfa);
                        this.e_klpakun.setText(line.kode_klpakun);
                        this.cb_nik1.setText(line.nik_pengirim);
                        this.cb_nik2.setText(line.nik_penerima);
                        this.e_lokfa.setText(line.kode_lokasal);
                        this.cb_lokfa2.setText(line.kode_loktuj);
					}
				} 

			}									
		} catch(e) {alert(e);}
	}

});