/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fBAK = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fBAK.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fBAK";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Berita Acara Inventarisasi (Koreksi)", 0);	
		uses("uploader;saiMemo;util_file;datePicker;uploader;checkBox;server_report_report;reportViewer;util_filterRep");
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiCBBL(this,{bound:[20,2,200,20],caption:"No BA",readOnly:true,
			multiSelection:false,
			sql:["select distinct no_ba, kode_lokfa from amu_ba_m where jenis_ba  = 'KKIL'",["no_ba","kode_lokfa"],false, ["No BA","Bus. Area"],"where","Daftar Berita Acara",true],
			change:[this,"doChange"]
		});		
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tgl. Inv",underline:true});
		this.dp_tgl2 = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});		
		this.dp_tgl3 = new datePicker(this,{bound:[230,1,100,18], selectDate:[this,"doSelectedDate"]});		
		this.ed_jenis = new saiCB(this,{bound:[20,3,200,20], caption:"Jenis",items:["TB","NTB"], change:[this,"doChange"]});
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Area Bisnis",
			multiSelection: false,
			text:this.app._kodeLokfa,
			rightLabel: this.app._namaLokfa,
			sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
			change:[this,"doChange"]
		});		
		this.ed_nik1 = new saiCBBL(this, {
			bound: [20, 3, 200, 20],
			caption: "TIM Inventarisasi",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});
		this.ed_nik2 = new saiCBBL(this, {
			bound: [20, 4, 200, 20],
			caption: "Ketua TIM",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});							
		/*this.ed_nik3 = new saiCBBL(this, {
			bound: [20, 5, 200, 20],
			caption: "Disetujui",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});*/					
		this.ed_tempat = new saiLabelEdit(this, {
			bound: [20, 6, 500, 50],
			caption: "Tempat",
			maxLength: 150
		});		
		this.ed_alamat = new saiLabelEdit(this, {
			bound: [20, 7, 500, 50],
			caption: "Alamat",
			maxLength: 150
		});		
		this.ed_ket = new saiMemo(this, {
			bound: [20, 9, 500, 50],
			caption: "Keterangan",
			maxLength: 150
		});
		this.bTampil = new button(this, {
			bound: [540, 9, 80, 20],
			caption: "Tampil",
			click:[this,"doTampil"]
		});
		this.p1 = new panel(this,{bound:[20,11,600,230],caption:"Data Asset"});
		this.sg = new saiGrid(this.p1, {
			bound: [1, 20, 898, 180],
			colCount: 4,
			colTitle: ["Kode Status","Nama Status","Jumlah Kartu Asset","Nilai Buku"],
			colWidth: [[3,2,1,0],[120,120,200,100]],
			colReadOnly:[true,[0,1,2,3],[]],			
			rowCount: 1,
			tag: 9,						
			colFormat:[[3],[cfNilai]]			
		});		
		this.sgn = new sgNavigator(this.p1, {
			bound: [1, this.p1.height - 25, 898, 25],
			buttonStyle: 3,
			grid: this.sg,
			pager:[this,"doPager"]
		});
		this.rearrangeChild(10,23);			
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);						
		this.onClose.set(this,"doClose");
		this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		this.filterRep = new util_filterRep();			
	}
};
window.app_assetsap_transaksi_fBAK.extend(window.childForm);
window.app_assetsap_transaksi_fBAK.implement({
	doClose: function(sender){				
	},
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
	doModalResult: function(event, result){				
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.ed_kode);		
						this.sg.clear(1);
						this.ed_lokfa.setText(this.app._kodeLokfa);
					}
				break;
				case "ubah" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){					
						//this.ed_nik3.getText()
						sql.add("delete from amu_ba_d where no_ba = '"+this.ed_kode.getText()+"' ");
						sql.add("delete from amu_ba_inv where no_ba = '"+this.ed_kode.getText()+"' ");
						sql.add("update amu_ba_m set kode_lokfa = '"+this.ed_lokfa.getText()+"', tgl_ba = '"+this.dp_tgl.getDateString()+"', "+
							" tgl_inv_mulai = '"+this.dp_tgl2.getDateString()+"', tgl_inv_selesai = '"+this.dp_tgl3.getDateString()+"',   "+
							" keterangan = '"+this.ed_ket.getText()+"', nik_app1 = '"+this.ed_nik1.getText()+"', nik_app2 = '"+this.ed_nik2.getText()+"' "+
							" ,jenis = '"+this.ed_jenis.getText()+"', alamat =  '"+this.ed_alamat.getText()+"', tempat = '"+this.ed_tempat.getText()+"' "+
							" where no_ba = '"+this.ed_kode.getText()+"' ");
						var line;
						for (var i=0;i < this.sg.getRowCount();i++){													
							sql.add("insert into amu_ba_d (no_ba, kode_lokasi, kode_status, jml, nilai_buku) "+
								" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+parseNilai(this.sg.cells(3,i))+"') ");
						}
						for (var i in this.dataINV.rs.rows){
							line = this.dataINV.rs.rows[i];
							sql.add("insert into amu_ba_inv(no_ba, no_inv, no_gabung, jenis_ba)values('"+this.ed_kode.getText()+"','"+line.no_inv+"','"+line.no_gabung+"','KKIL') ");
						}
						this.dbLib.execArraySQL(sql);
					}
				break;
				case "ubah" :
					
				break;
				case "hapus" :
					sql.add("delete from amu_ba_inv where no_ba = '"+this.ed_kode.getText()+"' ");
					sql.add("delete from amu_ba_d where no_ba = '"+this.ed_kode.getText()+"' ");
					sql.add("delete from amu_ba_m where no_ba = '"+this.ed_kode.getText()+"' ");
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){       
    },
	doFindBtnClick: function(sender){		
	},
	doChange: function(sender){
		if (sender == this.ed_lokfa){
			this.sg.clear(1);				
			this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"'  ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
			this.ed_nik2.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"'  ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
			//this.ed_nik3.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+sender.getText()+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
		}		
		if (sender == this.ed_jenis){
			this.sg.clear(1);
		}
		if (sender == this.ed_kode){
			var data =this.dbLib.getMultiDataProvider(new server_util_arrayList({items:["select a.kode_lokfa, date_format(a.tgl_ba, '%d-%m-%Y') as tgl_ba, date_format(a.tgl_inv_mulai, '%d-%m-%Y') as tgl_inv_mulai, date_format(a.tgl_inv_selesai, '%d-%m-%Y') as tgl_inv_selesai,  a.nik_app1, a.nik_app2, a.nik_app3, a.jenis, a.keterangan, a.periode, a.alamat, a.tempat, b.kode_status, c.nama, b.jml, b.nilai_buku from amu_ba_m a  "+
				" inner join amu_ba_d b on b.no_ba = a.no_ba "+
				"	inner join amu_status c on c.kode_status =  b.kode_status and c.jenis = a.jenis "+
				" where a.no_ba = '"+sender.getText()+"' ", 
				"select no_inv, no_gabung from amu_ba_inv where no_ba = '"+sender.getText()+"' "] }),true);
			if (data.result){
				var line,first = true;
				this.sg.clear();
				if (data.result[0].rs.rows[0]){
					setTipeButton(tbUbahHapus);
					for (var i in data.result[0].rs.rows){
						line = data.result[0].rs.rows[i];
						if (first){
							this.ed_lokfa.onChange.set(this,undefined);
							this.ed_jenis.onChange.set(this, undefined);
							this.ed_lokfa.setText(line.kode_lokfa);
							this.dp_tgl.setText(line.tgl_ba);
							this.dp_tgl2.setText(line.tgl_inv_mulai);
							this.dp_tgl3.setText(line.tgl_inv_selesai);
							this.ed_alamat.setText(line.alamat);
							this.ed_tempat.setText(line.tempat);							
							this.ed_nik1.setText(line.nik_app1);
							this.ed_nik2.setText(line.nik_app2);							
							this.ed_jenis.setText(line.jenis);
							this.ed_ket.setText(line.keterangan);
							this.ed_lokfa.onChange.set(this, "doChange");
							this.ed_jenis.onChange.set(this, "doChange");							
						}
						this.sg.appendData([line.kode_status, line.nama, floatToNilai(line.jml), floatToNilai(line.nilai_buku)]);
						first = false;
					}				
					this.dataINV = data.result[1];
				}else setTipeButton(tbAllFalse);
			}
		}
	},	
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.dbLib)
		{
			try
			{   				
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{							
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
							this.app._mainForm.bClear.click();							                                                       
						}else system.info(this,result,"");
	    			break;
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.fileUtil){	        
        }
	},	
	doGridChange: function(sender, col, row,param1,result, data){		
    },
	doTampil: function(sender){
		try {
			var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:["select e.kode_status, e.nama, sum(case when f.no_gabung is null then 0 else 1 end) as jml, sum(ifnull(f.nilai_buku,0)) as buku "+
			" from amu_status e "+			
			" left outer join (select distinct b.kode_status, a.no_gabung, a.nilai_buku from amu_asset a  "+
			"	inner join amu_kkl_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.ed_jenis.getText()+"' and c.tanggal between "+this.dp_tgl2.getDateString()+" and "+this.dp_tgl3.getDateString()+" " +			
			"	left outer join amu_ba_inv d on d.no_inv = c.no_inv and d.no_gabung = a.no_gabung and d.jenis_ba = 'KKIL'  "+
			"	left outer join amu_ba_m e on e.no_ba = d.no_ba and e.periode = a.periode and e.jenis_ba = 'KKIL' "+
			"	where a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and c.progress = '3' and d.no_gabung is null ) f on f.kode_status = e.kode_status "+
			" where e.jenis  = '"+this.ed_jenis.getText()+"' "+
			"group by e.kode_status, e.nama order by e.kode_status ",
			"select distinct c.no_inv, b.no_gabung from amu_asset a  "+
			"	inner join amu_kkl_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.ed_jenis.getText()+"' and c.tanggal between "+this.dp_tgl2.getDateString()+" and "+this.dp_tgl3.getDateString()+" " +			
			"	left outer join amu_ba_inv d on d.no_inv = c.no_inv and d.no_gabung = a.no_gabung and d.jenis_ba = 'KKIL' "+
			"	left outer join amu_ba_m e on e.no_ba = d.no_ba and e.periode = a.periode and e.jenis_ba = 'KKIL' "+
			"	where a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and c.progress = '3' and d.no_gabung is null"]}), true);			
			this.sg.clear();			
			if (typeof data != "string") {
				this.dataINV = data.result[1];
				data = data.result[0];
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg.appendData([line.kode_status, line.nama, line.jml, floatToNilai(line.buku)]);
				}
				this.sgn.setTotalPage(1);
				this.sgn.rearrange();									
			}
			else 
				systemAPI.alert(data);
		}catch(e){
			alert(e);
			
		}		
	},
	doPager: function(sender, page){
		this.doLoadData(page);
	},
	doLoadData: function(page){		
	},
	doSelectedPage: function(sender, page){
		if (this.pageHtml.get(page) === undefined){
			this.dbLib.getDataProviderPageA(this.sql,page,this.pager);
		}else{
			this.viewer.preview(this.pageHtml.get(page));
		}
		this.page = page;
		this.allBtn = false;
		
	},
	doCloseReportClick: function(sender){		
	  switch(sender.getName())
	  {
	    case "allBtn" :
			this.page = 1;
			this.allBtn = true;
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2));
			break;
	    case "pdfBtn" :
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter, this.page,this.allBtn ? this.viewer.getTotalPage() * this.pager:this.pager, this.showFilter, this.lokasi,this.filter2));
	      break;
	    case "MailBtn" :
			sender.owner = new ConfirmMail(this);
			sender.owner.setBound((this.width/2)-125,this.height/2-100,250,100);
			sender.owner.setCaption(sender.owner.title);
			sender.owner.setBorder(3);
		break;
	    default :
	        this.viewer.setVisible(false);
	      	this.p1.setVisible(true);
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      break;
	  
	  }
	},
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2);
		this.page = 1;
		this.allBtn = false;
		this.doSelectedPage(undefined, 1);
	}
});
