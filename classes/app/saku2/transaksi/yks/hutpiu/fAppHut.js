window.app_saku2_transaksi_yks_hutpiu_fAppHut = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_hutpiu_fAppHut.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_hutpiu_fAppHut";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approve Akru Hutang: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Approve",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Periode Pbyrn", maxLength:150});		
		this.cb_lokasi = new saiCBBL(this,{bound:[20,16,200,20],caption:"Lokasi Bayar", multiSelection:false, maxLength:10, tag:2});
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Range Tanggal", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 
		this.dp_d3 = new portalui_datePicker(this,{bound:[240,11,100,18]}); 
		this.i_load = new portalui_imageButton(this,{bound:[345,11,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.i_postAll = new portalui_imageButton(this,{bound:[370,11,20,20],hint:"App All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.e_total = new saiLabelEdit(this,{bound:[800,11,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new panel(this,{bound:[10,23,990,330],caption:"Daftar Detail Tagihan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:9,tag:0,
		            colTitle:["Status","No Hutang","Tanggal","Kode Mitra","Nama Mitra","No Invoice","Pensiun","Pegawai","Total"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,250,80,80,100,70]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8],[]],
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		

		this.rearrangeChild(10, 23);		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");			
	
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);												
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi in ('99','"+this.app._lokasi+"') ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);												
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_hutpiu_fAppHut.extend(window.childForm);
window.app_saku2_transaksi_yks_hutpiu_fAppHut.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{											
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_app_m","no_app",this.app._lokasi+"-APP"+this.e_periode.getText().substr(2,4)+".","000"));					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into yk_app_m(no_app,kode_lokasi,no_dokumen,tanggal,keterangan,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,lok_bayar) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"','-','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_lokasi.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i)=="APP"){
								sql.add("insert into yk_app_d(no_app,kode_lokasi,no_hutang,no_inv,kode_vendor) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(3,i)+"')");							
								sql.add("update yk_hutang_d set lok_bayar='"+this.cb_lokasi.getText()+"',no_app='"+this.e_nb.getText()+"' where no_hutang='"+this.sg.cells(1,i)+"' and kode_vendor='"+this.sg.cells(3,i)+"' and no_inv='"+this.sg.cells(5,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								sql.add("update yk_bill_d set no_app='"+this.e_nb.getText()+"' where no_hutang='"+this.sg.cells(1,i)+"' and kode_vendor='"+this.sg.cells(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							}
						}
					}
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
					this.sg.clear(1); 					
					setTipeButton(tbSimpan);					
				break;
			case "simpan" :					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}				
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_app_m","no_app",this.app._lokasi+"-APP"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
		}
		if (sender == this.i_postAll) {
			for (var i=0;i < this.sg.getRowCount();i++){
				this.sg.cells(0,i,"APP");
			}
		}
		if (sender == this.i_load) {
			var strSQL = "select a.no_hutang,convert(varchar,x.tanggal,103) as tanggal,a.kode_vendor,b.nama as nama_vendor,a.no_inv,a.nilai_cc,a.nilai_bp,a.nilai_cc+a.nilai_bp as total "+
						 "from yk_hutang_d a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
						 "				     inner join yk_hutang_m x on a.no_hutang=x.no_hutang and a.kode_lokasi=x.kode_lokasi "+
						 "where x.modul='HUTKES' and x.tanggal between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_app='-' order by a.kode_vendor,a.no_inv";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG",line.no_hutang,line.tanggal,line.kode_vendor,line.nama_vendor,line.no_inv,floatToNilai(line.nilai_cc),floatToNilai(line.nilai_bp),floatToNilai(line.total)]);
				}
			} else this.sg.clear(1);
		}
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.sg.validasi();
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++) {
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != "" && this.sg.cells(0,i) == "APP"){
					tot += nilaiToFloat(this.sg.cells(8,i));
				}
			}
			this.e_total.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});