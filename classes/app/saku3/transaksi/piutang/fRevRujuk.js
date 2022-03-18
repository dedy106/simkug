window.app_saku3_transaksi_piutang_fRevRujuk = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_piutang_fRevRujuk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_piutang_fRevRujuk";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reverse Akru Hutang Rujukan: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Jurnal","List Jurnal"]});				
		this.sg4 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,310,100,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});
		this.bLoad4 = new portalui_imageButton(this.sgn4,{bound:[this.sgn4.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad4"]});						
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.c_sort = new saiCB(this.pc2.childPage[0],{bound:[790,12,200,20],caption:"SortBy",items:["MITRA","NOBUKTI"], readOnly:true,tag:2});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,10,450,20],caption:"No Dokumen", maxLength:50});				
		this.e_debet = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,10,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});														
		this.bTampil = new button(this.pc2.childPage[0],{bound:[600,14,80,18],caption:"Tampil Data",click:[this,"doTampilClick"]});			
		this.bJurnal = new button(this.pc2.childPage[0],{bound:[690,14,80,18],caption:"Jurnal",click:[this,"doJurnalClick"]});							
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,995,340], childPage:["Data Hutang","Jurnal Rekon"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
				colTitle:["Status","No Hutang","Kode","Mitra","Tanggal","Keterangan","BP","CC","Total"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,230,10,250,10,100,70]],
				colHide:[[2,4],[true,true]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8],[]],
				colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP"]})]],checkItem:true,
				change:[this,"doChangeCell"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","DRK"],
					colWidth:[[6,5,4,3,2,1,0],[80,80,100,300,50,300,100]],
					columnReadOnly:[true,[0,1,2,4,5,6],[3]],
					colFormat:[[4],[cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[930,5,100,25],caption:"Preview",selected:true,visible:false});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro = 'PPBPCC' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kodepp = line.flag;
			} else this.kodepp = '-';			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_piutang_fRevRujuk.extend(window.childForm);
window.app_saku3_transaksi_piutang_fRevRujuk.implement({
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
			if (this.stsSimpan == 1) this.doClick();			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from yk_rekon_m where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_rekon_j where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_rekon_d where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from angg_r where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						
						sql.add("update yk_hutang_d set no_rekon='-' where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update dbhupitmp.dbo.transutangpiutang set stsakru='AKRU',no_rekon='-' "+
								"where stsakru='-' and no_rekon='"+this.e_nb.getText()+"' and kodelokasi='"+this.app._lokasi+"'");		
					}
					
					sql.add("insert into yk_rekon_m(no_rekon,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','-','REKONRUJ','HUT','IDR',1,"+parseNilai(this.e_debet.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','F',getdate(),'"+this.app._userLog+"')");	
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								
								sql.add("insert into yk_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.kodepp+"','"+this.sg2.cells(6,i)+"','"+this.app._lokasi+"','REKONRUJ','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','REKONRUJ','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.kodepp+"','"+this.sg2.cells(6,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.sg2.cells(2,i)+"',0,"+parseNilai(this.sg2.cells(4,i))+")");
							}
						}
					}
					var nobukti = "";
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {						
							nobukti += ",'"+this.app._lokasi+this.sg.cells(1,i)+this.sg.cells(2,i)+"'";										
							sql.add("insert into yk_rekon_d(no_rekon,kode_lokasi,periode,no_hutang,bank_trans,no_kas,modul,nilai_bp,nilai_cc) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.sg.cells(1,i)+"','-','-','REKONRUJ',"+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+")");
						
							sql.add("update a set a.stsakru='-',a.no_rekon='"+this.e_nb.getText()+"' "+
									"from dbhupitmp.dbo.transutangpiutang a inner join yk_bill_m b on a.nobukti=b.no_bill and a.kodelokasi=b.kode_lokasi "+
									"where a.stsakru='AKRU' and b.no_hutang='"+this.sg.cells(1,i)+"' and b.kodelokasi='"+this.app._lokasi+"'");		
						}
					}
					nobukti = nobukti.substr(1);					
					sql.add("update yk_hutang_d set no_rekon ='"+this.e_nb.getText()+"' where kode_lokasi+no_hutang+kode_vendor in ("+nobukti+") and kode_lokasi='"+this.app._lokasi+"'");
															
					sql.add("insert into yk_bill_d (no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,nilai,pph,jenis,periode,no_hutang,no_piutang,no_selesai,no_tak,kode_lokasal) "+
							"select '"+this.e_nb.getText()+"',no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,-nilai,-pph,jenis,'"+this.e_periode.getText()+"','"+this.e_nb.getText()+"',no_piutang,no_selesai,no_tak,kode_lokasal "+
							"from yk_bill_d where kode_lokasi+no_hutang+kode_vendor in ("+nobukti+")  and kode_lokasi ='"+this.app._lokasi+"'");
					
					
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
					this.sg.clear(1);this.sg2.clear(1);this.sg4.clear(1);
					setTipeButton(tbAllFalse);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.doClick();
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
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
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from yk_rekon_m where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_rekon_j where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_rekon_d where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from angg_r where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update yk_hutang_d set no_rekon='-' where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					
					sql.add("update dbhupitmp.dbo.transutangpiutang set stsakru='AKRU',no_rekon='-' "+
							"where stsakru='-' and no_rekon='"+this.e_nb.getText()+"' and kodelokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		if (this.stsSimpan == 1) this.doClick();			
	},
	doTampilClick:function(sender){		
		if (this.e_periode.getText() != "") {			
			if (this.c_sort.getText() == "MITRA") vSort = " order by c.kode_vendor ";
			else vSort = " order by a.no_hutang ";
			var data = this.dbLib.getDataProvider("select a.no_hutang,c.kode_vendor,c.nama as nama_vendor,convert(varchar,b.tanggal,103) as tgl,b.keterangan,sum(a.nilai_bp) as nilai_bp,sum(a.nilai_cc) as nilai_cc,sum(a.nilai_bp+a.nilai_cc) as total "+
			           "from yk_hutang_d a inner join yk_hutang_m b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					   
					   "                   inner join vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi "+
			           "where b.progress='1' and b.modul='HUTRUJ' and a.no_rekon='-' and b.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					   "group by c.kode_vendor,c.nama,a.no_hutang,b.tanggal,b.keterangan "+vSort,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["APP",line.no_hutang,line.kode_vendor,line.nama_vendor,line.tgl,line.keterangan,floatToNilai(line.nilai_bp),floatToNilai(line.nilai_cc),floatToNilai(line.total)]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else {
			system.alert(this,"Data tidak valid.","Periode harus diisi.");
		}
	},
	doJurnalClick:function(sender){		
		this.sg2.clear(); 
		var nobukti = "";
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
				nobukti += ",'"+this.app._lokasi+this.sg.cells(1,i)+this.sg.cells(2,i)+"'";				
			}
		}
		nobukti = nobukti.substr(1);		
		var strSQL = "select b.nama as ket,"+
					"       case f.jenis when 'PENSIUN' then b.akun_cc "+
					"                    when 'PEGAWAI' then b.akun_bp "+
					"                    when 'GROUP' then b.akun_ap "+						
					"       end as kode_akun,d.nama as nama_akun,'C' as dc,"+
					"       sum(a.nilai) as nilai,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end as jenis,g.kode_drk,g.nama as nama_drk "+
					"from yk_bill_d a  "+
					"           inner join yk_loker ff on a.loker=ff.loker "+
					"           inner join cust f on ff.kode_cust=f.kode_cust "+
					"  			inner join yk_produk b on a.kode_produk=b.kode_produk "+
					"  			inner join masakun d on (case f.jenis when 'PENSIUN' then b.akun_cc "+
					"                             			          when 'PEGAWAI' then b.akun_bp "+
					"                             				      when 'GROUP' then b.akun_ap "+					
					"       							  end)=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' "+
					"  			inner join drk g on (case f.jenis when 'PENSIUN' then b.kode_drkcc else b.kode_drkbp end)=g.kode_drk and g.kode_lokasi='"+this.app._lokasi+"' and g.tahun=b.tahun "+
					"where a.kode_lokasi+a.no_hutang+a.kode_vendor in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+
					"group by b.nama,case f.jenis when 'PENSIUN' then b.akun_cc "+
					"                             when 'PEGAWAI' then b.akun_bp "+
					"                             when 'GROUP' then b.akun_ap "+						
					"       end,d.nama,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end,g.kode_drk,g.nama "+												
					"union all "+																		
					"select "+
					"case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end as ket, "+
					"case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end as kode_akun,c.nama as nama_akun,'D' as dc, sum(a.nilai - a.pph) as nilai,  "+
					"case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end as jenis,'-' as kode_drk,'-' as nama_drk "+
					"from yk_bill_d a "+
					"inner join yk_loker ff on a.loker=ff.loker "+
					"inner join cust f on ff.kode_cust=f.kode_cust "+						
					"inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
					"inner join vendor_klp bb on bb.kode_klpvendor=b.kode_klpvendor and bb.kode_lokasi=b.kode_lokasi  "+
					"inner join masakun c on (case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end)=c.kode_akun and b.kode_lokasi=c.kode_lokasi  "+
					"where a.kode_lokasi+a.no_hutang+a.kode_vendor in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+
					"group by case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end, "+
					"         case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end,c.nama, "+
					"         case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end "+							
					"union all "+											
					"select "+
					"'HUTANG PPH' as ket,cc.kode_akun,cc.nama as nama_akun,'D' as dc, "+
					"sum(a.pph) as nilai,'PPH' as jenis,'-' as kode_drk,'-' as nama_drk "+
					"from yk_bill_d a "+							
					"                 inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
					"                 inner join masakun cc on b.akun_pph = cc.kode_akun and b.kode_lokasi=cc.kode_lokasi "+
					"where a.kode_lokasi+a.no_hutang+a.kode_vendor in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+
					"group by cc.kode_akun,cc.nama "+
					
					"order by dc desc,kode_akun";
				 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase(),line.kode_drk]);
			}
		}
		this.sg2.validasi();
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {									
			this.sg.clear(1);this.sg2.clear(1);
			this.e_debet.setText("0");
			this.e_kredit.setText("0");
			this.bTampil.show();				
			this.bJurnal.show();
		}	
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_rekon_m","no_rekon",this.app._lokasi+"-RKN"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();		
		this.stsSimpan = 1;		
		setTipeButton(tbSimpan);
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					if (this.sg2.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg2.cells(4,i));
					if (this.sg2.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg2.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
   	doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg2.clear(1);
			this.sg2.validasi();
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_hutang='"+this.e_nb.getText()+"' ";
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
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
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
				this.pc2.show();   
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
			this.sg.clear(1);this.sg2.clear(1);this.sg4.clear(1);
			setTipeButton(tbAllFalse);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad4:function(sender){																				
		var strSQL = "select a.no_rekon,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from yk_rekon_m a "+					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted='F' and modul='REKONRUJ' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU4 = data;
			this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn4.rearrange();
			this.doTampilData4(1);
		} else this.sg4.clear(1);			
	},
	doTampilData4: function(page) {
		this.sg4.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU4.rs.rows.length? this.dataJU4.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU4.rs.rows[i];													
			this.sg4.appendData([line.no_rekon,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg4.setNoUrut(start);
	},
	doPager4: function(sender, page) {
		this.doTampilData4(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg4.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.bTampil.hide();				
				this.bJurnal.hide();
		
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg4.cells(0,row));								
								
				var strSQL = "select no_dokumen,keterangan,tanggal "+
							 "from yk_rekon_m "+							 
							 "where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);																								
						this.e_ket.setText(line.keterangan);																								
					}					
				}							
					   
					   
				var data = this.dbLib.getDataProvider("select a.no_hutang,c.kode_vendor,c.nama as nama_vendor,convert(varchar,b.tanggal,103) as tgl,b.keterangan,sum(a.nilai_bp) as nilai_bp,sum(a.nilai_cc) as nilai_cc,sum(a.nilai_bp+a.nilai_cc) as total "+
			           "from yk_hutang_d a inner join yk_hutang_m b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					   
					   "                   inner join vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi "+
			           "where a.no_rekon='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					   "group by c.kode_vendor,c.nama,a.no_hutang,b.tanggal,b.keterangan order by c.kode_vendor",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["APP",line.no_hutang,line.kode_vendor,line.nama_vendor,line.tgl,line.keterangan,floatToNilai(line.nilai_bp),floatToNilai(line.nilai_cc),floatToNilai(line.total)]);
					}
				} else this.sg.clear(1);	
				
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.jenis,a.kode_drk "+
							"from yk_rekon_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+														
							"where a.no_rekon = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.jenis,line.kode_drk]);
					}
				} else this.sg2.clear(1);				
			}									
		} catch(e) {alert(e);}
	}
});