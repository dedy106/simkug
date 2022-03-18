window.app_saku2_transaksi_aka_fAmorPddProdiBea = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fAmorPddProdiBea.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_fAmorPddProdiBea";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Amortisasi Pendapatan Diterima Dimuka (Prodi): Proses", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_nilai = new saiLabelEdit(this,{bound:[550,17,200,20],caption:"Total Amortisasi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this,{bound:[780,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
	
		this.p1 = new panel(this,{bound:[20,23,840,333],caption:"Data Jurnal Amortisasi"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:8,tag:0,
		            colTitle:["Akun PDD","Nama Akun","Akun PDPT","Nama Akun","Kode PP","Nama PP","Nilai","Kode DRK"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,100,150,80,150,80,150,80]],
					colFormat:[[6],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});	
		
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
		
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='ARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			uses("server_report_report;portalui_reportViewer");
			this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
			this.viewer.hide();
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_fAmorPddProdiBea.extend(window.childForm);
window.app_saku2_transaksi_aka_fAmorPddProdiBea.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_amor_m","no_amor",this.app._lokasi+"-AMO"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into aka_amor_m(no_amor,no_dokumen,tanggal,keterangan,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_nilai.getText())+",'-','-','F','AMOLOADPR','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");					
					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						sql.add("insert into aka_amor_j(no_amor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+line.akun_pdd+"','"+this.e_ket.getText()+"','D',"+line.nilai_amor+",'"+line.kode_pp+"','"+line.kode_drk+"','"+this.app._lokasi+"','AMOLOADPR','PDD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
						sql.add("insert into aka_amor_j(no_amor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+line.akun_pdpt+"','"+this.e_ket.getText()+"','C',"+line.nilai_amor+",'"+line.kode_pp+"','"+line.kode_drk+"','"+this.app._lokasi+"','AMOLOADPR','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}			
					var perNext = nextNPeriode(this.e_periode.getText(),1);
					sql.add("call sp_ar_amor_prodi_bea ('"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+perNext+"','"+this.e_nb.getText()+"')");
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
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai amortisasi tidak boleh nol atau kurang.");
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
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_amor_m","no_amor",this.app._lokasi+"-AMO"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
	},
	doLoadData: function(sender){
	    this.e_nilai.setText("0");
		var strSQL = "select a.akun_pdd,x.nama as nama_pdd,a.akun_pdpt,y.nama as nama_pdpt,e.kode_pp,e.nama as nama_pp, "+
					 "	sum(case when a.nilai-isnull(xx.tot_batal,0)-isnull(d.tot_amor,0) > ceiling(a.nilai/6)  "+
					 "		 then ceiling((a.nilai-isnull(xx.tot_batal,0))/6) "+
					 "		 else a.nilai-isnull(xx.tot_batal,0)-isnull(d.tot_amor,0) end) as nilai_amor, c.kode_drk "+
					 "	from aka_bill_d a  "+
					 "		 inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
					 "		 inner join aka_jurusan c on b.kode_jur=c.kode_jur and a.kode_lokasi=c.kode_lokasi "+
					 "		 inner join pp e on e.kode_pp=c.kode_pp and e.kode_lokasi=c.kode_lokasi "+ 
					 "		 inner join masakun x on a.akun_pdd=x.kode_akun and a.kode_lokasi=x.kode_lokasi  "+
					 "		 inner join masakun y on a.akun_pdpt=y.kode_akun and a.kode_lokasi=y.kode_lokasi "+
					 "       inner join drk cc on cc.kode_drk=c.kode_drk and cc.kode_lokasi=c.kode_lokasi and cc.tahun=c.tahun "+
					 "	   left join  "+
					 "		 (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_amor  "+
					 "		  from aka_amor_d where kode_lokasi = '"+this.app._lokasi+"' and kode_produk like 'BEA%' group by no_inv,kode_produk,kode_lokasi) d on  "+
					 "		  a.no_inv=d.no_inv and a.kode_produk=d.kode_produk and a.kode_lokasi=d.kode_lokasi  "+					 
					 "     left join "+
					 "       (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_batal "+
					 "        from aka_batal_d where kode_lokasi = '"+this.app._lokasi+"' and kode_produk like 'BEA%' group by no_inv,kode_produk,kode_lokasi) xx on "+
					 "        a.no_inv=xx.no_inv and a.kode_produk=xx.kode_produk and a.kode_lokasi=xx.kode_lokasi "+
					 "	where a.kode_produk ='BEABPP' and a.kode_lokasi = '"+this.app._lokasi+"' "+
					 " 	and a.nilai-isnull(xx.tot_batal,0) > isnull(d.tot_amor,0) and a.periode_susut = '"+this.e_periode.getText()+"' "+
					 "	group by a.akun_pdd,x.nama,a.akun_pdpt,y.nama,e.kode_pp,e.nama,c.kode_drk order by a.akun_pdd";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.nilai_amor);
			}		
			this.e_nilai.setText(floatToNilai(tot));
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);	
	},
	doChange:function(sender){
		if (sender == this.e_periode) {			
			this.dataJU.rs.rows = [];
			this.sg.clear(1);			
		}
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.akun_pdd,line.nama_pdd,line.akun_pdpt,line.nama_pdpt,line.kode_pp,line.nama_pp,floatToNilai(line.nilai_amor),line.kode_drk]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.nama_report="server_report_saku2_kopeg_aka_rptAkAmorJurnal";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_amor='"+this.e_nb.getText()+"' ";
							this.filter = this.filter2;
							this.viewer.prepare();
							this.viewer.setVisible(true);
							this.app._mainForm.pButton.setVisible(false);
							this.app._mainForm.reportNavigator.setVisible(true);
							this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
							this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
							this.app._mainForm.reportNavigator.rearrange();
							this.showFilter = undefined;
							this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
							this.page = 1;
							this.allBtn = false;
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :				
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();			
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.setTag("0");
			this.dataJU.rs.rows = [];
			this.sg.clear(1); 
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});